import { configure } from "vee-validate";
import { localize } from "@vee-validate/i18n";
import en from "@vee-validate/i18n/dist/locale/en.json ";
import ka from "@vee-validate/i18n/dist/locale/ka.json ";

configure({
  generateMessage: localize({
    en: {
      ...en,
      messages: {
        required: "this field is required",
        email: "invalid email format, please enter valid email",
        min: "{field} must have at least 0:{min} symbols",
        max: "{field} must have at least 0:{max} symbols",
        alpha_num: "{field} must contain english letters or numbers",
        lowercase: "email or username must contain only lowercase letters",
        confirm_password: "passwords must match",
        en: "{field} must contain english letters",
      },
      names: {
        bodyEn: "field",
        bodyKa: "field",
        nameKa: "name field",
        nameEn: "name field",
        directorKa: "director field",
        directorEn: "director field",
        genreEn: "genre field",
        genreKa: "genre field",
        descriptionEn: "description field",
        descriptionKa: "description field",
        confirm_password: "Confirm password",
      },
    },
    ka: {
      ...ka,
      messages: {
        required: "გთხოვთ შეავსოთ მოცემული ველი",
        email: "თქვენს მიერ შეყვანილი ტექსტი არ აკმაყოფილებს მეილის ფორმატს",
        min: "{field} უნდა შეიცავდეს მინიმუმ 0:{min} სიმბოლოს",
        max: "{field} უნდა შეიცავდეს მაქსიმუმ 0:{max} სიმბოლოს",
        alpha_num: "{field} უნდა შეიცავდეს ლათინურ ასოებს ან რიცხვებს",
        confirm_password: "{field} უნდა ემთხვეოდეს პაროლს",
        lowercase: "მეილი/სახელი უნდა შეიცავდეს მხოლოდ პატარა ასოებს",
        geo: "{field} უნდა შეიცავდეს ქართულ ასოებს",
      },
      names: {
        bodyEn: "field",
        bodyKa: "ველი",
        nameKa: "სახელის ველი",
        nameEn: "name field",
        directorEn: "director field",
        directorKa: "რეჟისორის ველი",
        genreEn: "genre field",
        genreKa: "ჟანრის ველი",
        descriptionEn: "description field",
        descriptionKa: "აღწერის ველი",
        name: "მომხმარებლის სახელი",
        password: "პაროლი",
        confirm_password: "განმეორებით პაროლი",
        username: "მომხმარებლის სახელი",
        email: "მეილი",
      },
    },
  }),
});
