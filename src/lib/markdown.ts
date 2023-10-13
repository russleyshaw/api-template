export function a(text: string, url: string): string {
    return `[${text}](${url})`;
}

export function li(text: string): string {
    return `- ${text}`;
}

export function h2(text: string): string {
    return `## ${text}`;
}

export function hr(): string {
    return "---";
}
