import { useContext } from "react";
import { LanguageContext } from "./LanguageContext";
export const useLang = () => useContext(LanguageContext);