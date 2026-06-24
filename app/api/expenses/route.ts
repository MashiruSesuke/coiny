import { NextRequest, NextResponse } from 'next/server';

// Mock-data (will be reset on server restart)
const expenses = [
  { id: 1, title: 'Products', amount: 150, category: 'Food', date: '2026-06-20' },
  { id: 2, title: 'Disel', amount: 50, category: 'Transport', date: '2026-06-21' },
  { id: 3, title: 'Cafe', amount: 30, category: 'Food', date: '2026-06-22' },
];

// Delay function
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// GET — get all expenses
export async function GET() {
  await delay(500);
  return NextResponse.json(expenses);
}

// POST — add new expense
export async function POST(request: NextRequest) {
  const body = await request.json();
  const newExpense = {
    id: Date.now(),
    ...body,
  };
  expenses.push(newExpense);
  await delay(500);
  return NextResponse.json(newExpense, { status: 201 });
}

// PUT — update expense by ID
export async function PUT(request: NextRequest) {
  const body = await request.json();
  const index = expenses.findIndex((e) => e.id === body.id);
  if (index === -1) {
    return NextResponse.json({ error: 'Expense not found' }, { status: 404 });
  }
  expenses[index] = { ...expenses[index], ...body };
  await delay(500);
  return NextResponse.json(expenses[index]);
}

// DELETE — delete expense by ID
export async function DELETE(request: NextRequest) {
  const { id } = await request.json();
  const index = expenses.findIndex((e) => e.id === id);
  if (index === -1) {
    return NextResponse.json({ error: 'Expense not found' }, { status: 404 });
  }
  expenses.splice(index, 1);
  await delay(500);
  return NextResponse.json({ success: true });
}
