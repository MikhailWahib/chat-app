const colors: [string, string][] = [
    ['from-pink-500 to-rose-500', 'text-rose-100'],
    ['from-purple-500 to-violet-500', 'text-violet-100'],
    ['from-blue-500 to-indigo-500', 'text-indigo-100'],
    ['from-teal-500 to-emerald-500', 'text-emerald-100'],
    ['from-orange-500 to-amber-500', 'text-amber-100'],
    ['from-cyan-500 to-sky-500', 'text-sky-100'],
];

export const getUserColor = (username: string): [string, string] => {
    // Get consistent index based on username
    const index = username.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const colorIndex = index % colors.length;
    return colors[colorIndex];
}
