import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { transactionSchema } from '@/lib/validations';
import { ObjectId } from 'mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('financeflow');
    const transactions = await db.collection('transactions').find({}).sort({ date: -1 }).toArray();
    
    return NextResponse.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validatedData = transactionSchema.parse({
      ...body,
      amount: parseFloat(body.amount),
    });
    
    const client = await clientPromise;
    const db = client.db('financeflow');
    
    const transaction = {
      ...validatedData,
      date: new Date(validatedData.date),
      createdAt: new Date(),
    };
    
    const result = await db.collection('transactions').insertOne(transaction);
    
    return NextResponse.json({ id: result.insertedId, ...transaction });
  } catch (error) {
    console.error('Error creating transaction:', error);
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: 'Invalid data', details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create transaction' }, { status: 500 });
  }
}
