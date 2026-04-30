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
              <TableHead className="text-right font-bold">Created At</TableHead>
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
                  <span className="bg-secondary/70 rounded-lg py-1 px-4">
                    ৳{participant.remAmount}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  {participant.batchNo}
                </TableCell>
                <TableCell className="text-right">
                  {/* FIXME: fix this to Bangladesh standard time */}
                  {format(
                    new Date(participant.createdAt),
                    "dd MMMM, yy; hh:mm a",
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </main>
  );
}
