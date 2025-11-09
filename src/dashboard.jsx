// src/dashboard.jsx
import React from 'react';
import { Card, CardContent, CardHeader } from '@mui/material';

export default function Dashboard() {
  return (
    <Card>
      <CardHeader title="Welcome to the Books Admin" />
      <CardContent>
        This is a practice dashboard. Use the Books resource to list, show, create and edit books.
      </CardContent>
    </Card>
  );
}
