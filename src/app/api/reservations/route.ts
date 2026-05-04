import {
  readReservations,
  validateReservation,
  writeReservations,
} from "@/libs/reservations";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    const reservations = await readReservations();
    const sorted = [...reservations].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

    return NextResponse.json(sorted);
  } catch {
    return NextResponse.json(
      { message: "Unable to load reservations." },
      { status: 500 },
    );
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const error = validateReservation(body);

    if (error) {
      return NextResponse.json({ message: error }, { status: 400 });
    }

    const reservations = await readReservations();
    const now = new Date().toISOString();
    const newReservation = {
      id: `res_${Date.now()}`,
      reservationName: String(body.reservationName).trim(),
      email: String(body.email).trim(),
      phone: String(body.phone).trim(),
      date: String(body.date),
      time: String(body.time),
      partySize: Number(body.partySize),
      experience: String(body.experience),
      notes: String(body.notes ?? "").trim(),
      status: "new",
      adminResponse: "",
      createdAt: now,
      updatedAt: now,
    };

    reservations.push(newReservation);
    await writeReservations(reservations);

    return NextResponse.json(newReservation, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: "Unable to create reservation." },
      { status: 500 },
    );
  }
};
