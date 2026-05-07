"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getParticipantList } from "./getParticipantList";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { cn } from "@/lib/utils";

type Participant = {
  name: string;
  batchNo: string;
  preRegAmount: number;
  remAmount: number;
  createdAt: Date;
};

export default function Info() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParticipants = async () => {
      setLoading(true);
      const data = await getParticipantList();
      setParticipants(data);
      setLoading(false);
    };
    fetchParticipants();
  }, []);

  if (loading) {
    return <LoadingOverlay isLoading />;
  }

  return (
    <main className="w-9/10 mx-auto space-y-8">
      <section>
        <h1 className="my-4 text-center font-semibold text-4xl">
          Participants&apos; List
        </h1>

        <Table>
          <TableHeader>
            <TableRow className="text-center">
              <TableHead className="w-1/3 font-bold">Name</TableHead>
              <TableHead className="text-center font-bold">Paid</TableHead>
              <TableHead className="text-center font-bold">Remaining</TableHead>
              <TableHead className="text-center font-bold">Batch No</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {participants.map((participant, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium capitalize">
                  {participant.name}
                </TableCell>
                <TableCell className="text-center">
                  ৳{participant.preRegAmount}
                </TableCell>
                <TableCell className="text-center">
                  <span
                    className={cn(
                      "bg-secondary/70 rounded-lg py-1 px-4",
                      participant.remAmount === 0
                        ? "bg-green-400/60"
                        : "bg-secondary/70",
                    )}
                  >
                    {participant.remAmount === 0
                      ? "Fully Paid"
                      : `৳${participant.remAmount}`}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  {participant.batchNo}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </main>
  );
}
