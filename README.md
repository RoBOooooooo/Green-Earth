README file to answer the following question-
What is the difference between var, let, and const?
Ans:

var → function scoped, redeclare করা যায়, hoisting এর সময় value undefined হয়ে যায়।
let → block scoped, redeclare করা যায় না, কিন্তু value change করা যায়।
const → block scoped, redeclare করা যায় না, আবার value change করাও যায় না (তবে object বা array হলে ভিতরের মান change করা যায়)।
What is the difference between map(), forEach(), and filter()?
Ans: এই তিনটা method অ্যারের উপর কাজ করে, কিন্তু কাজের ধরন আলাদা:

forEach() শুধু লুপ চালায়, কিছু return করে না। যেমন console.log করার জন্য কাজে লাগে।

map() নতুন একটা array তৈরি করে, যেখানে আগের array-এর প্রতিটা element কে পরিবর্তন করা যায়।

filter() নতুন array রিটার্ন করে, কিন্তু এখানে কন্ডিশন মেনে যেগুলো true হয় শুধু সেগুলো রাখে।

সংক্ষেপে, forEach কাজ করে side effect এর জন্য, map কাজ করে transform করার জন্য, আর filter কাজ করে select করার জন্য।

What are arrow functions in ES6?
Ans: Arrow function হলো ES6-এর একটি shorthand function syntax। সাধারণ function এর চেয়ে এটা ছোট করে লেখা যায়।

How does destructuring assignment work in ES6?
Ans: Destructuring হলো সহজভাবে বলতে গেলে object আর array থেকে ডাটা আলাদা ভেরিয়েবলে বের করে আনার শর্টকাট পদ্ধতি।

Explain template literals in ES6. How are they different from string concatenation?
Ans: Template literal হলো ES6-এ string লেখার নতুন পদ্ধতি। এখানে backtick (`) ব্যবহার করা হয়। এর মধ্যে ${variable} লিখে সরাসরি variable এর মান বসানো যায়।