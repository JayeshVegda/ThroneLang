import { useRef, useState } from "react";
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste'

const Documentation = () => {
    const [copied, setCopied] = useState(false);
    const [copiedIndex, setCopiedIndex] = useState(null);
    const divRef = useRef(null)

    const data = [
        {
            title: "General",
            description:
                "winter_is_coming is the entrypoint for the program and all programs must end with winter_is_ended.",
            code: [
                { text: "This will be ignored", color: "text-gray-500" },
                { text: "winter_is_coming", color: "text-green-400" },
                { text: "// Write code here", color: "text-gray-400" },
                { text: "winter_is_ended", color: "text-red-400" },
                { text: "This too", color: "text-gray-500" },
            ],
        },
        {
            title: "Variables",
            description:
                "Variables can be declared using claim",
            code: [
                { text: "This will be ignored", color: "text-gray-500" },
                { text: "winter_is_coming", color: "text-green-400" },
                { text: 'claim warriors = 500;', color: "text-yellow-400" },
                { text: 'claim castle_name = "Winterfell";', color: "text-yellow-400" },
                { text: "winter_is_ended", color: "text-red-400" },
            ],
        },
        {
            title: "Types",
            description:
                "Numbers and strings are like other languages. Null values can be denoted using void. true and false are the boolean values",
            code: [
                { text: "This will be ignored", color: "text-gray-500" },
                { text: "winter_is_coming", color: "text-green-400" },
                {text: 'claim warriors = 500;', color: "text-yellow-400" },
                {text: 'claim coin = 50.40;', color: "text-yellow-400" },
                {text: 'claim is_war_ready = rightful;', color: "text-yellow-400" },
                { text: "winter_is_ended", color: "text-red-400" },
            ],
        },
        {
            title: "Function",
            description:
                "Use declare to define a function.",
            code: [
                
                { text: "This will be ignored", color: "text-gray-500" },
                { text: 'winter_is_coming', color: "text-green-400" },
                { text: 'declare summon_army(soldiers):', color: "text-yellow-400" },
                { text: '    attack (soldiers > 1000):', color: "text-yellow-400" },
                { text: '        send rightful', color: "text-yellow-400" },
                { text: '    send traitor', color: "text-yellow-400" },
                { text: "winter_is_ended", color: "text-red-400" },
                { text: "This too", color: "text-gray-500" },
            ],
        },
        {
            title: "Conditionals",
            description:
                "Thronelang supports if-else-if ladder construct. attack block will execute if condition is rightful, otherwise one of the subsequently added attack_again blocks will execute if their respective condition is rightful, and the fallback block will eventually execute if all of the above conditions are traitor.",
            code: [
                { text: "This will be ignored", color: "text-gray-500" },
                { text: 'winter_is_coming', color: "text-green-400" },
                { text: 'claim knights = 120', color: "text-yellow-400" },
                { text: 'attack (knights > 100):', color: "text-yellow-400" },
                { text: "   decarys('Attack under 100')", color: "text-green-400" },
                { text: "attack_again (knights > 50):", color: "text-yellow-400" },
                { text: "   decarys('Attack under 50')", color: "text-green-400" },
                { text: "fallback:", color: "text-yellow-400" },
                { text: "   decarys('fall back')", color: "text-green-400" },
                { text: "winter_is_ended", color: "text-red-400" },
                { text: "This too", color: "text-gray-500" },                             
            ],
        },
        {
            title: "Loops",
            description:
                "Statements inside watch blocks are executed as long as a specified condition evaluates to rightful. If the condition becomes traitor, statements within the loop stop executing and control passes to the statement following the loop. Use siege to execute a block at least once, march for iterating, and use halt to break the loop or next to continue.",
            code: [
                { text: "This will be ignored", color: "text-gray-500" },
                { text: 'winter_is_coming', color: "text-green-400" },
                { text: 'claim supplies = 10', color: "text-yellow-400" },
                { text: 'watch (supplies > 0):', color: "text-yellow-400" },
                { text: "    decarys('Continue the siege')", color: "text-yellow-400" },
                { text: "    supplies = supplies - 1", color: "text-yellow-400" },
                { text: "winter_is_ended", color: "text-red-400" },
                { text: "This too", color: "text-gray-500" },
            ],
        },
    ];
    const handleCopy = (index, code) => {
        if (code.length <= 2) return; // Prevent copying if there are less than 3 lines

        const textToCopy = code.slice(1, -1).map((line) => line.text).join("\n");
        navigator.clipboard.writeText(textToCopy);
        
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <div className="text-white min-h-screen p-8">
            <h1 className="text-2xl mb-4 font-got tracking-wide sm:text-4xl md:text-4xl lg:text-4xl xl:text-4xl">Documentation</h1>
            <p className="mb-6 text-lg sm:text-lg md:text-xl lg:text-xl xl:text-xl">
                ThroneLang is a mystical, dynamically typed language forged for the rulers of code, where logic meets legend.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
                {data.map((section, index) => (
                    <div key={index} className="border-t border-white pt-6">
                        <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
                        <p className="mb-4 text-md">{section.description}</p>
                        <div className="bg-[#063C4C] relative p-4 rounded-md text-sm font-mono">
                            <button
                                onClick={() => handleCopy(index, section.code)}
                                className="absolute cursor-pointer top-2 right-2 bg-gray-500/35 hover:bg-gray-500/60 transition text-white px-2 py-1 text-xs rounded flex items-center gap-1"
                            >
                                {copiedIndex === index ? <ContentPaste fontSize="inherit" /> : <ContentCopy fontSize="inherit" />}
                                {copiedIndex === index ? "Copied" : "Copy"}
                            </button>
                            {section.code.map((line, idx) => (
                                <pre key={idx} className={`${line.color} whitespace-pre-wrap`}>{line.text}</pre>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-20 flex justify-center text-md">
                © 2025 Jayesh Vegda, Jay Dhandhukiya
            </div>
        </div>
    );
};

export default Documentation;
