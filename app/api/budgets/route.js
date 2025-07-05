import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { budgetSchema } from '@/lib/validations';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('financeflow');
    const budgets = await db.collection('budgets').find({}).sort({ month: -1 }).toArray();
    
    return NextResponse.json(budgets);
  } catch (error) {
    console.error('Error fetching budgets:', error);
    return NextResponse.json({ error: 'Failed to fetch budgets' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validatedData = budgetSchema.parse({
      ...body,
      amount: parseFloat(body.amount),
    });
    
    const client = await clientPromise;
    const db = client.db('financeflow');
    
    // Check if budget already exists for this month and category
    const existingBudget = await db.collection('budgets').findOne({
      month: validatedData.month,
      category: validatedData.category,
    });
    
    if (existingBudget) {
      // Update existing budget
      const result = await db.collection('budgets').updateOne(
        { _id: existingBudget._id },
        { $set: { ...validatedData, updatedAt: new Date() } }
      );
      
      return NextResponse.json({ id: existingBudget._id, ...validatedData });
    } else {
      // Create new budget
      const budget = {
        ...validatedData,
        createdAt: new Date(),
      };
      
      const result = await db.collection('budgets').insertOne(budget);
      
      return NextResponse.json({ id: result.insertedId, ...budget });
    }
  } catch (error) {
    console.error('Error creating/updating budget:', error);
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: 'Invalid data', details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create/update budget' }, { status: 500 });
  }
}
