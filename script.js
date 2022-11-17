//要素取得
const passwordGeneration = document.getElementById("generation-password");
const passwordLength = document.getElementById("pas-len");

const small_alphabets = "abcdefghijklmnopqrstuvwxyz";
const large_alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const number = "0123456789"

let exit_flag = false;

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
    let [character, conditions] = useCharacter();
    // let receive = useCharacter();
    // let character = receive[0];
    // let conditions = receive[1];
    alert(character + "\n" + conditions);
    
    character_array = shuffleArray(character);
    reg = new RegExp(conditions);
    
    try {
        if (exit_flag) {
            throw new Error('終了します');
        }
        do {
            var password = ""
            for (let step = 0; step < passwordLength.value; step++) {
                const nmb = Math.floor(Math.random() * character_array.length);
                password += character_array[nmb]
            }
        } while(password.search(reg) == -1);
    } catch (error) {
        alert("生成エラー");
        exit_flag = false;
    }

    password = shuffleArray(password)

    passwordGeneration.textContent = password.join("");
}

// 必ず入れる文字の種類（正規表現）
function useCharacter() {
    const set_small = document.settings.small_alphabets;
    const set_large = document.settings.large_alphabets;
    const set_number = document.settings.number;

    useCha = "";
    mustCha = "";

    if (!(set_small[2].checked)) {
        useCha += small_alphabets;
        if (set_small[0].checked) mustCha += "[a-z]";
    }
    if (!(set_large[2].checked)) {
        useCha += large_alphabets;
        if (set_large[0].checked) mustCha += "[A-Z]";
    }
    if (!(set_number[2].checked)) {
        useCha += number;
        if (set_number[0].checked) mustCha += "[0-9]";
    }
    if (useCha == ""){
        alert("なにかしらの文字を使用してください");
        exit_flag = true;
    }
    return [useCha, mustCha];
}

// パスワードをコピー
function copyToClipboard() {
    // コピー対象をJavaScript上で変数として定義する
    var copyTarget = passwordGeneration.textContent;

    navigator.clipboard.writeText(copyTarget);

    // コピーをお知らせする
    alert("コピーできました！ : " + copyTarget);
}