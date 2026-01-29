export function applyThemeColors(
  primary: string,
  secondary: string,
  primary_dark: string,
  secondary_dark: string
) {
  document.documentElement.style.setProperty("--primary", primary);
  document.documentElement.style.setProperty("--secondary", secondary);
  document.documentElement.style.setProperty("--primary-dark", primary_dark);
  document.documentElement.style.setProperty(
    "--secondary-dark",
    secondary_dark
  );
}
