function greetUser(name, callback) {
    console.log("Hello, " + name );
    callback();
}

function askQuestion() {
    console.log("How are you doing today?");
}
greetUser("Alice", askQuestion);