function addText() {
  const container = document.createElement('div');
  container.className = 'dynamic-section';
  container.innerHTML = `
    <div style="margin-top: 1rem;">
      <input type="text" placeholder="Title (e.g., Headline)" />
      <input type="text" placeholder="Text Color" />
      <select>
        <option>Bold</option>
        <option>Italic</option>
        <option>Regular</option>
      </select>
    </div>`;
  document.getElementById("textSections").appendChild(container);
}

function addContentSection() {
  const container = document.createElement('div');
  container.className = 'dynamic-section';
  container.innerHTML = `
    <div style="margin-top: 1rem;">
      <input type="text" placeholder="Section Title" />
      <textarea rows="2" placeholder="Description"></textarea>
      <input type="text" placeholder="Icon Description (optional)" />
    </div>`;
  document.getElementById("contentSections").appendChild(container);
}

function addContactInfo() {
  const container = document.createElement('div');
  container.className = 'dynamic-contact';
  container.innerHTML = `
    <div style="margin-top: 1rem;">
      <input type="text" placeholder="Contact Type (e.g., WhatsApp)" />
      <input type="text" placeholder="Value (e.g., +123456789)" />
    </div>`;
  document.getElementById("contactInfos").appendChild(container);
}

function generatePrompt() {
  const business = document.getElementById("businessType").value;
  const style = document.getElementById("designStyle").value;
  const colors = document.getElementById("colorScheme").value;
  const layout = document.getElementById("layoutFormat").value;
  const placement = document.getElementById("placement").value;
  const lighting = document.getElementById("lighting").value;
  const cover = document.getElementById("coverImageDesc").value;

  // Text sections
  const texts = [...document.querySelectorAll("#textSections .dynamic-section")].map(div => {
    const inputs = div.querySelectorAll("input");
    return `Text - "${inputs[0].value}" in ${inputs[1].value} and styled as ${inputs[2].value}`;
  });

  // Content sections
  const sections = [...document.querySelectorAll("#contentSections .dynamic-section")].map(div => {
    const title = div.querySelector("input").value;
    const desc = div.querySelector("textarea").value;
    const icon = div.querySelectorAll("input")[1]?.value || "";
    return `Section - ${title}: ${desc}${icon ? `, Icon: ${icon}` : ""}`;
  });

  // Contacts
  const contacts = [...document.querySelectorAll("#contactInfos .dynamic-contact")].map(div => {
    const type = div.querySelectorAll("input")[0].value;
    const val = div.querySelectorAll("input")[1].value;
    return `${type}: ${val}`;
  });

  const contactPos = document.getElementById("contactPosition").value;

  const prompt = `A brochure for a ${business}.
Design style: ${style}, using a color scheme of ${colors}.
Layout: ${layout}.
Placement: ${placement}.
Lighting: ${lighting}.
Cover image description: ${cover}.
Text elements: ${texts.join("; ") || "None"}.
Content sections: ${sections.join("; ") || "None"}.
Contact info (${contactPos}): ${contacts.join(", ") || "None"}.
Professional design, clean typography, and balanced layout.`;

  document.getElementById("outputPrompt").value = prompt;
}

function copyPrompt() {
  const output = document.getElementById("outputPrompt");
  output.select();
  document.execCommand("copy");
  alert("Prompt copied to clipboard!");
}
