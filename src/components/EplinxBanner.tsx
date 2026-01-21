/*
 * Copyright (c) Starry Systems and Nijika Softworks.
 */

import { useEffect } from "react";

function EplinxBanner() {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://media.eplinx.net/js/code.min.js";
        script.async = true;
        script.dataset.cfasync = "false";
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return <ins className="ins-zone" data-zone="160108"></ins>;
}

export default EplinxBanner;
