import "jsr:@supabase/functions-js/edge-runtime.d.ts"

console.log("Hello from Functions!")

Deno.serve((req) => {
     return new Response(JSON.stringify({ message: "ok" }), {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*", // autorise tous les domaines
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization"
        },
    });
});

