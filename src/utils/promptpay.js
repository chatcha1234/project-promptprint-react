function crc16(data) {
  let crc = 0xffff;
  for (let i = 0; i < data.length; i++) {
    let x = ((crc >> 8) ^ data.charCodeAt(i)) & 0xff;
    x ^= x >> 4;
    crc = (crc << 8) ^ (x << 12) ^ (x << 5) ^ x;
  }
  crc &= 0xffff;
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

function formatField(id, value) {
  const len = value.length.toString().padStart(2, "0");
  return id + len + value;
}

export function generatePromptPayPayload(phoneNumber, amount) {
  /*
    PromptPay Payload Standard (EMVCo):
    000201      Version 01
    010212      Point of Initiation Method (12 = Dynamic, 11 = Static)
    2937        Merchant Account Information (PromptPay)
      0016A000000677010111  AID
      01130066...           Mobile/ID
    5802TH      Country Code
    5303764     Currency (THB)
    54xx.xx     Amount
    6304        CRC
  */

  const pTarget = phoneNumber.replace(/[^0-9]/g, "");
  let target = "";

  // Format Target (Phone or ID)
  // Phone: 0066 + 9 digits (remove leading 0) -> 13 chars
  // ID: 13 digits -> 13 chars
  if (pTarget.length >= 10) {
    // Phone 0812345678 -> 66812345678
    target = "0066" + pTarget.substring(1);
  } else {
    // E-Wallet or Citizen ID (usually 13)
    // Assuming Citizen ID for now if 13
    target = pTarget;
  }

  const merchantInfo =
    formatField("00", "A000000677010111") + formatField("01", target);

  let payload =
    formatField("00", "01") +
    formatField("01", amount > 0 ? "12" : "11") + // 12 for dynamic (with amount)
    formatField("29", merchantInfo) +
    formatField("58", "TH") +
    formatField("53", "764");

  if (amount > 0) {
    payload += formatField("54", amount.toFixed(2));
  }

  payload += "6304"; // Append CRC ID and Length

  const crc = crc16(payload);
  return payload + crc;
}
