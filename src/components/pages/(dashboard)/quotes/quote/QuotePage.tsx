import QuoteSection from "./QuoteSection";

type QuotePageProps = {
  quoteId: string;
};

const QuotePage = ({ quoteId }: QuotePageProps) => {
  return <QuoteSection quoteId={quoteId} />;
};

export default QuotePage;
