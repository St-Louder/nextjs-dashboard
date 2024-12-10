import { db } from "@vercel/postgres";

const client = await db.connect();

async function listInvoices() {
	const data = await client.sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666;
  `;

	return data.rows;
}

export async function GET() {
  try {
    // Await listInvoices to ensure data is fetched before responding
    const invoices = await listInvoices();
    
    // Return the list of invoices in the response
    return Response.json(invoices);

  } catch (error) {
    // Log error for debugging purposes
    console.error(error);

    // Return a 500 error response with the error message
    return Response.json({ error: (error as Error).message || 'Failed to fetch invoices' }, { status: 500 });
  }
}
