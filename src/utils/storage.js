export const STORAGE_KEY = "financeData";

export const exportStateAsJSON = (state) => {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "finance-data.json";
  a.click();
};

export const importStateFromJSON = (file, onLoad) => {
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const parsed = JSON.parse(e.target.result);
      onLoad(parsed);
    } catch {
      alert("Invalid JSON file.");
    }
  };
  reader.readAsText(file);
};

export const clearAllData = () => {
  localStorage.removeItem(STORAGE_KEY);
  window.location.reload();
};
