import { useDispatch } from "react-redux";
import { AppDispatch } from "../state/store";

type DispatchFunc = () => AppDispatch

export const useAppDispatch: DispatchFunc = useDispatch