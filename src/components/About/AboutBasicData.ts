interface BlogInfo  {
    kinds: string[];
    path: string[];
    stacks: string[];
    content: Array<string>;
    date: Array<string>;
}

const blogInfo: BlogInfo = {
    kinds: ["종류","블로그"],
    path: ["위치", "C:\\Users\\ktj\\Desktop"],
    stacks: ["스택","TypeScript, React, Redux, Chakra-ui"],
    content: ["내용","안녕하세요, 김태중의 블로그입니다."],
    date: ["만든날짜","2021년 03월 28일 일요일, 오후 6:00:00"],
}

export { blogInfo };