"use client";

import { useParams } from 'next/navigation';

export default function ProfilePage() {
  const { username } = useParams();

  return (
    <div>{username}</div>
  )
}
