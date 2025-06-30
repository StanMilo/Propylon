export const stripHtmlAndFormat = (
  htmlText: string | null | undefined
): string => {
  if (!htmlText) {
    return "";
  }

  const textWithoutHtml = htmlText.replace(/<[^>]*>/g, "");

  let cleanedText = textWithoutHtml.replace(/\s+/g, " ").trim();

  // Only break at semicolons and sentence endings (periods followed by space and uppercase)
  cleanedText = cleanedText
    .replace(/\s*;\s*/g, ";\n")
    .replace(/\s*\.\s+(?=[A-Z][a-z])/g, ".\n") // Break at periods followed by space and uppercase letter
    .replace(/\s*\.\s*$/g, ".\n"); // Break at periods at the end of the text

  return cleanedText;
};

export const formatLongTitle = (title: string | null | undefined): string[] => {
  const formattedText = stripHtmlAndFormat(title);
  return formattedText.split("\n").filter((line) => line.trim().length > 0);
};
