import type { FaqMarqueeRow } from '../components/FaqMarquee';

export const faqMarqueeData: FaqMarqueeRow[] = [
  {
    id: 'row-1',
    direction: 'left',
    durationSeconds: 60,
    items: [
      { id: '1', question: "What is the Country Growth Index (CGI)?", answer: "The CGI is a composite score reflecting a country's macroeconomic health and growth trajectory, built from transparent global data." },
      { id: '2', question: "How is the risk band calculated?", answer: "Risk bands are derived from volatility, debt sustainability, and institutional stability metrics within the core growth model." },
      { id: '3', question: "Is this a credit rating?", answer: "No. The CGI is a pure reflection of macro health and trajectory, not a guarantee or traditional credit rating." },
      { id: '4', question: "How often is data updated?", answer: "Our models ingest new macroeconomic data points daily, but top-level index scores are recalibrated at the end of each month." },
      { id: '5', question: "Can I compare multiple countries?", answer: "Yes, the platform allows side-by-side benchmarking of up to 10 countries across all underlying metrics." },
    ]
  },
  {
    id: 'row-2',
    direction: 'right',
    durationSeconds: 45,
    items: [
      { id: '6', question: "Is my data secure?", answer: "We use enterprise-grade encryption and do not share your proprietary research or portfolio data with third parties." },
      { id: '7', question: "Do you offer API access?", answer: "Yes, our Professional and Enterprise tiers include full API access to pull real-time CGI data directly into your systems." },
      { id: '8', question: "How do I contact support?", answer: "Support is available 24/5 via our in-app chat for Premium users, or through your dedicated account manager for Enterprise." },
      { id: '9', question: "Can I cancel anytime?", answer: "Yes, subscriptions operate on a month-to-month basis unless an annual contract is signed. You can cancel directly from your settings." },
      { id: '10', question: "How are the data sources verified?", answer: "We source strictly from verified institutional providers (World Bank, IMF) and cross-validate data automatically to ensure integrity." },
    ]
  }
];
