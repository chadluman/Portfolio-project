import Breadcrumb from "@/components/Breadcrumb";
import Faq from "@/components/Faq";
import PricingGrids from "@/components/Pricing/PricingGrids";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Chad Luman",
  description:
    "Services and offerings from Chad Luman — full stack developer and systems analyst.",
};

const PricingPage = () => {
  return (
    <>
      <Breadcrumb pageTitle="Services" />
      <section className="pb-20 pt-17.5 lg:pb-25 lg:pt-22.5 xl:pt-27.5">
        <PricingGrids />
      </section>

      <Faq />
    </>
  );
};

export default PricingPage;
