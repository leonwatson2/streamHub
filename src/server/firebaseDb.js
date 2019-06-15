var dbname = "practice-186819";
var admin = require('firebase-admin');

var serviceAccount = require('./serviceAccountKey.json');


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${dbname}.firebaseio.com`
});
var db = admin.database() 

const addOneToCount = async (section) => {

    if(!section) return 
    var ref = db.ref(`/server/saving-data/counters/${section}`) 
    var response = await ref.once("value")
    var sectionValue = response.val();
    var update;
    if(!response.val()){
        update = await ref.set({ value: 1 })
    } else {
        update = await ref
            .update( { value: sectionValue.value + 1 } )
            .then( _ => {
                return getSectionValue(section, db)
                
        })
    }
    return update.val()
}
const getSectionValue = (section) => {

    if(!section) return 
    var ref = db.ref(`/server/saving-data/counters/${section}`)
    
    return ref.once("value")
}
const getAllCounters = () => {

    var ref = db.ref(`/server/saving-data/counters`)
    ref.on("value", (snapshot) => {
        snapshot.val()
    }) 

}

getSectionValue('calmdown').then(s=>{
    s.val() //?
})
module.exports = {
    addOneToCount,
    getAllCounters,
    getSectionValue
}