// Generates and triggers download of an RFC 6350 compliant vCard (.vcf)
// Perfect for mobile recruiters and clients to add Pratham Panchal directly to phone contacts

export function downloadVCard() {
  const vcardData = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "FN:Pratham Panchal",
    "N:Panchal;Pratham;;;",
    "TITLE:Frontend Developer & React Specialist",
    "ORG:Freelance & Web Development",
    "TEL;TYPE=CELL,VOICE,WHATSAPP:+919638561264",
    "EMAIL;TYPE=INTERNET,PREF:prathampanchal1515@gmail.com",
    "URL:https://my-portfolio-one-cyan-rlqanq9j8c.vercel.app/",
    "ADR;TYPE=HOME:;;Ahmedabad;Gujarat;;India",
    "NOTE:Frontend Developer specializing in React 19, Modern UI/UX, Single Page Applications, and High Performance Web Engineering.",
    "END:VCARD"
  ].join("\r\n");

  const blob = new Blob([vcardData], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "Pratham_Panchal_Frontend_Developer.vcf");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

