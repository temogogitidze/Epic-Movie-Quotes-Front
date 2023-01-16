import { defineRule } from "vee-validate";
import { required, email, min, alpha_num, max } from "@vee-validate/rules";

defineRule("required", required);
defineRule("alpha_num", alpha_num);
defineRule("email", email);
defineRule("min", min);
defineRule("max", max);

defineRule("lowercase", (value) => {
  const regex = /^[a-z0-9.@]*$/;
  if (!regex.test(value)) {
    return false;
  }
  return true;
});

defineRule("geo", (value) => {
  const regex = /^[ა-ჰა-ჰ0-9-_\';?!:.,"\s]*$/;
  if (!regex.test(value)) {
    return false;
  }
  return true;
});

defineRule("en", (value) => {
  const regex = /^[a-zA-Z0-9-_\';?!:.,"\s]*$/;
  if (!regex.test(value)) {
    return false;
  }
  return true;
});

defineRule("confirmed", (value, [target], ctx) => {
  if (value === ctx.form[target]) {
    return true;
  }
  return "passwords must match";
});
