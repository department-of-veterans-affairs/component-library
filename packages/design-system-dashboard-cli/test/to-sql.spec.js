// const {
//   insert,
//   update 
// } = require('../src/to-sql');

// const flattenedData = [
//   {
//     date: '2022-04-08',
//     component_name: 'alert',
//     some_app: 2,
//     total: 2
//   },
//   {
//     date: '2022-04-08',
//     component_name: 'accordion',
//     some_app: 2,
//     another_app: 1,
//     total: 3
//   },
// ]

// describe('insert', () => {
//   it('creates an INSERT query', () => {
//     const insertQuery = insert(flattenedData);

//     expect(insertQuery).toEqual('INSERT INTO `vsp-analytics-and-insights.platform_design_system.component-usage-count` (date, component_name, some_app, total, another_app) VALUES ("2022-04-08", "alert", 2, 2, 0), ("2022-04-08", "accordion", 2, 3, 1)');
//   });
// });

// describe('update', () => {
//   it('creates an UPDATE query for each component', () => {
//     const updateQueries = update(flattenedData).split('\n\n');

//     expect(updateQueries.length).toEqual(2);
//     expect(updateQueries[0]).toEqual('UPDATE `vsp-analytics-and-insights.platform_design_system.component-usage-count` SET some_app = 2, total = 2 WHERE component_name = "alert" AND date = "2022-04-08";')
//   expect(updateQueries[1]).toEqual('UPDATE `vsp-analytics-and-insights.platform_design_system.component-usage-count` SET some_app = 2, another_app = 1, total = 3 WHERE component_name = "accordion" AND date = "2022-04-08";')
//   });
// });
