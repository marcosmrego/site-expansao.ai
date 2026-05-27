export function Logo() {
    return (
        <div className="logo">
            <svg
                width="32"
                height="32"
                viewBox="0 0 28 28"
                fill="none"
                aria-hidden="true"
            >
                <circle cx="14" cy="8" r="2.5" fill="#9A78FF" />
                <circle cx="20" cy="18" r="2.5" fill="#5B9AFF" />
                <circle cx="8" cy="18" r="2.5" fill="#B09AFF" />
                <line
                    x1="14"
                    y1="8"
                    x2="20"
                    y2="18"
                    stroke="rgba(154,120,255,0.5)"
                    strokeWidth="1"
                />
                <line
                    x1="14"
                    y1="8"
                    x2="8"
                    y2="18"
                    stroke="rgba(154,120,255,0.5)"
                    strokeWidth="1"
                />
                <line
                    x1="20"
                    y1="18"
                    x2="8"
                    y2="18"
                    stroke="rgba(91,154,255,0.4)"
                    strokeWidth="1"
                />
                <circle
                    cx="14"
                    cy="14"
                    r="13"
                    stroke="rgba(130,90,255,0.35)"
                    strokeWidth="1"
                />
            </svg>

            <span>Expansão AI</span>
        </div>
    );
}