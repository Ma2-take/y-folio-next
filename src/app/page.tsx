import type { Metadata } from "next";
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: "ホーム",
};

export default function LandingPage() {
  redirect('/login');
}