import { readReservations, writeReservations } from "@/libs/reservations";
import { NextRequest, NextResponse } from "next/server";

type RespondRouteProps = {
  params: Promise<{
    id: string;
  }>;
};

export const PATCH = async (
  request: NextRequest,
  { params }: RespondRouteProps,
) => {
  try {
    const { id } = await params;
    const body = await request.json();
    const reservations = await readReservations();
    const reservationIndex = reservations.findIndex((item) => item.id === id);

    if (reservationIndex === -1) {
      return NextResponse.json(
        { message: "Reservation not found." },
        { status: 404 },
      );
    }

    const current = reservations[reservationIndex];
    const updatedReservation = {
      ...current,
      status: String(body.status || current.status),
      adminResponse: String(body.adminResponse ?? current.adminResponse),
      updatedAt: new Date().toISOString(),
    };

    reservations[reservationIndex] = updatedReservation;
    await writeReservations(reservations);

    return NextResponse.json(updatedReservation);
  } catch {
    return NextResponse.json(
      { message: "Unable to update reservation." },
      { status: 500 },
    );
  }
};
