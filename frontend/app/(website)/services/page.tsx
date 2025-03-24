import PageHeader from "../_components/page-header";

import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ServicesContainer } from "./_components/services-container";
import { PageContainer } from "../_components/page-container";

export default function Service() {
  return (
    <PageContainer name={"Services"}>
      <ServicesContainer />
    </PageContainer>
  );
}
