var members = ['egoing', 'k8805', 'hoya'];
console.log(members[1]); // k8805

var i = 0;
while(i < members.length) {
  console.log('array - ', members[i]);
  i++;
}

var roles = {
  'programmer':'egoing',
  'designer' : 'k8805',
  'manager' : 'hoya'
}
console.log(roles.designer); //k8805
console.log(roles['programmer']); //k8805

for (var key in roles) {
  console.log('object => ', key, 'value => ', roles[key]);
}
