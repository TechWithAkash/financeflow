import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { transactionSchema } from '@/lib/validations';
import { ObjectId } from 'mongodb';

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
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
      updatedAt: new Date(),
    };
    
    const result = await db.collection('transactions').updateOne(
      { _id: new ObjectId(id) },
      { $set: transaction }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
    }
    
    return NextResponse.json({ id, ...transaction });
  } catch (error) {
    console.error('Error updating transaction:', error);
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: 'Invalid data', details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to update transaction' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    
    const client = await clientPromise;
    const db = client.db('financeflow');
    
    const result = await db.collection('transactions').deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    console.error('Error deleting transaction:', error);
    return NextResponse.json({ error: 'Failed to delete transaction' }, { status: 500 });
  }
}
