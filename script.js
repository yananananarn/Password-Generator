//要素取得
const passwordGeneration = document.getElementById("generation-password");
const passwordLength = document.getElementById("pas-len");

const small_alphabets = "abcdefghijklmnopqrstuvwxyz";
const large_alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const number = "0123456789"

const shuffleArray = (array) => {
    const cloneArray = [...array]

    for (let i = cloneArray.length - 1; i >= 0; i--) {
        let rand = Math.floor(Math.random() * (i + 1))
        let tmpStorage = cloneArray[i]
        cloneArray[i] = cloneArray[rand]
        cloneArray[rand] = tmpStorage
    }

    return cloneArray
}

// パスワード生成
function generation(){
    let character = ""
    character += small_alphabets
    character += large_alphabets
    character += number
    character_array = shuffleArray(character);

    let conditions = useCharacter();
    // alert(conditions)
    reg = new RegExp(conditions);
    
    try {
        do {
            var password = ""
            for (let step = 0; step < passwordLength.value; step++) {
                const nmb = Math.floor(Math.random() * character_array.length);
                password += character_array[nmb]
            }
        } while(password.search(reg) == -1);
    } catch (error) {
        alert("生成エラー");
    }

    password = shuffleArray(password)

    passwordGeneration.textContent = password.join("");
}
function useCharacter() {
    useCha = ""
    if (document.getElementById("small_alphabets").checked) {
        useCha += "[a-z]"
    }
    if (document.getElementById("large_alphabets").checked) {
        useCha += "[A-Z]"
    }
    if (document.getElementById("number").checked) {
        useCha += "[0-9]"
    }
    if (useCha == "") {
        useCha = ""
    }
    return useCha;
}