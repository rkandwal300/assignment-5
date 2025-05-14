import { Button } from "@/components/ui/button";
import React from "react";
const InstanceDetailRow = ({ label, value }) => (
  <Button
    variant="secondary"
    size="lg"
    className="font-semibold text-lg flex justify-between"
  >
    <span className="text-muted-foreground">{label}: </span>
    <span>{value}</span>
  </Button>
);
export default InstanceDetailRow;
