const jsonServer = require('json-server');
const server = jsonServer.create();
const db = require('./mock-db.json')
const router = jsonServer.router('./mock/mock-db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3100;

server.use(jsonServer.bodyParser)
server.use(middlewares);

server.use(jsonServer.rewriter({
  "/api/page1/submit": "/page1_submit",
  "/api/page1/submit_rating_comment": "/page1_submit_rating_comment",
  "/api/page3/factsRules": "/facts_and_rules",
  "/api/page3/ratingAndComment": "/ratingAndComment",
}))

server.get('/facts_and_rules', (req, res) => {
  const res1 = router.db.get("facts_and_rules").value();
  res.json(db.facts_and_rules_result);
})

  .post('/facts_and_rules', (req, res) => {
    console.log('req.body:', req.body)
    // const a = router.db.get("facts_and_rules").set({ ...req.body, id: 40 });
    // console.log('aaa-->', a);    
    const items = router.db.get('facts_and_rules').value();
    //console.log("items: ", items);
    
    var true_p = Math.random() * 10;
    var false_p = Math.random() * 10;
    var label = null;
    if (true_p > false_p) {
      label = 1;
    } else {
      label = 0;
    }

    const row = {
      ...req.body,
      id: items.length + 1,
      false_probability: false_p,
      true_probability: true_p,
      label: label,
      rating: 5,
    }

    items.push(row)
    //console.log(router.db.get('facts_and_rules').value(), items)
    router.db.set('facts_and_rules', items).write()
    res.json({ id: row.id, rating: row.rating, false_probability: row.false_probability, true_probability: row.true_probability, label: row.label })
  })

  .post('/page1_submit', (req, res) => {
    console.log('req.body:', req.body)

    const items = router.db.get('page1_submit').value();
    //console.log("items:", items)

    const row = {
      ...req.body, id: items.length + 1,
      generated_text: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    }
    items.push(row)

    router.db.set('page1_submit', items).write()
    res.json({ generated_text: row.generated_text })
  })
  ;
  
server.use(router);
server.listen(port);
