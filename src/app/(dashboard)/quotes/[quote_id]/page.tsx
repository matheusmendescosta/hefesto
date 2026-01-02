import QuotePage from "@/components/pages/(dashboard)/quotes/quote/QuotePage";

const page = async ({ params }: { params: Promise<{ quote_id: string }> }) => {
  return <QuotePage quoteId={(await params).quote_id} />;
};

export default page;
