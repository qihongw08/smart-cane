// _layout.tsx
import React from 'react';
import MainLayout from '../components/MainLayout';
import SavvyStepperMain from './SmartStep';
import { Slot } from 'expo-router';

export default function RootLayout() {
  return (
    <MainLayout>
        <Slot></Slot>
    </MainLayout>
  );
}
