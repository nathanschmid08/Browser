async function searchSpell() {
    const input = document.getElementById('searchInput').value.trim().toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = "Searching...";

    try {
      const res = await fetch("https://raw.githubusercontent.com/nathanschmid08/HPDB/refs/heads/main/spells.json");
      const spells = await res.json();

      const spell = spells.find(s => s.name.toLowerCase() === input);
      if (spell) {
        resultDiv.innerHTML = `<strong>${spell.name}</strong><br>${spell.description}`;
      } else {
        resultDiv.textContent = "Spell not found.";
      }
    } catch (err) {
      resultDiv.textContent = "Error loading spells.";
      console.error(err);
    }
  }
