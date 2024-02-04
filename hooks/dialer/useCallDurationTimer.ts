import { CallTimerContext } from "@/context/CallTimerContext";
import { useContext } from "react";

export const  useCallDurationTimer =()=>useContext(CallTimerContext)