"use server";

import { connectDB } from "@/lib/db";
import PreRegInfo from "@/lib/models/PreRegInfo";

export async function getParticipantList() {
  await connectDB();

  const participants = await PreRegInfo.find()
    .select("name batchNo preRegAmount createdAt")
    .sort({ createdAt: 1 })
    .lean();

  const formattedParticipants = participants.map((participant) => {
    const preRegAmount =
      Math.floor(Number(participant.preRegAmount) / 500) * 500;
    const remAmount = 8500 - preRegAmount;
    return {
      name: participant.name.toLowerCase(),
      batchNo: ordinalSuffix(Number(participant.batchNo)),
      preRegAmount,
      remAmount,
      createdAt: participant.createdAt,
    };
  });

  return formattedParticipants;
}

function ordinalSuffix(n: number): string {
  const s = [" th", " st", " nd", " rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
