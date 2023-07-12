import express, { Request, Response } from "express";
import dbHos from "../config/dbHos";
import dbRcm from "../config/dbRcm";
import verifyToken from "../middleware/auth";
const dbudgetRoutes = express.Router();

/* GET IPD */
dbudgetRoutes.get(
  "/ipd-sum",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      var sql = `SELECT
  a.pttype,
  pttype.name as pttype_name,
  pttype.pttype_eclaim_id,
  pc.income_ipd,
  pc.name,
  FORMAT(SUM(a.item_money), 2) as 'HosXP',
  FORMAT(SUM(rep.Collected), 2) as 'Collected',
  FORMAT(SUM(sta.Compensated), 2) as 'Compensated'
  FROM an_stat a
  INNER JOIN patient p ON a.hn = p.hn
  LEFT JOIN (SELECT
  r.AN,
  r.ID,
  r.PID,
  r.PtName,
  r.AdmDate,
  r.Collected,
  rc.Compensated
  FROM an_stat a
  INNER JOIN rcmdb.repdata r ON a.an = r.AN
  LEFT JOIN rcmdb.repeclaim rc ON a.an = rc.AN
  WHERE a.regdate BETWEEN '2022-10-01' AND '2023-09-30') rep ON a.an = rep.AN
   LEFT JOIN (SELECT
   rc.AN,
   rc.VN,
    rc.ID,
    rc.PID,
    rc.PtName,
    rc.AdmDate,
    rc.Compensated
    FROM an_stat a
    INNER JOIN rcmdb.repeclaim rc ON a.an = rc.an
    WHERE a.regdate BETWEEN '2022-10-01' AND '2023-09-30') sta ON a.an = sta.an
  LEFT JOIN pttype ON a.pttype = pttype.pttype
  LEFT JOIN pttype_eclaim pc ON pttype.pttype_eclaim_id = pc.code
  WHERE a.regdate BETWEEN '2022-10-01' AND '2023-09-30'
  GROUP BY pc.income_ipd 
  ORDER BY SUM(a.item_money) DESC
  `;
      const query = await dbHos.raw(sql);
      res.json({ status: 200, results: query[0] });
    } catch (error: any) {
      res.json({ status: 500, results: error.message });
    }
  }
);

dbudgetRoutes.get(
  "/visit-ipd",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      var sql = `SELECT
  pe.name,
  pttype.hipdata_code,
  FORMAT(COUNT(a.an),0) as count,
  FORMAT(SUM(a.item_money),2) as money,
  FORMAT(SUM(r.Collected),2 )as collected,
  FORMAT(SUM(c.Compensated),2) as compensated
  FROM an_stat a
  LEFT JOIN rcmdb.repdata r ON a.an = r.an
  LEFT JOIN rcmdb.repeclaim c ON a.an = c.an
  LEFT JOIN pttype ON a.pttype = pttype.pttype
  LEFT JOIN pttype_eclaim pe ON pttype.pttype_eclaim_id = pe.code
  WHERE
  a.regdate = current_date
  GROUP BY pe.name
  ORDER BY SUM(a.item_money) DESC`;
      const query = await dbHos.raw(sql);
      res.json({ status: 200, results: query[0] });
    } catch (error: any) {
      res.json({ status: 500, results: error.message });
    }
  }
);

dbudgetRoutes.get(
  "/visit-ipd-month",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      var sql = `SELECT
   pe.ar_ipd,
   pe.name as pttype_claim_name,
   p.hipdata_code,
   p.name as pttype_name,
   FORMAT(SUM(IF(MONTH(a.regdate) = 10,1,0) ), 0)  as 'M10',
   FORMAT(SUM(IF(MONTH(a.regdate) = 10,a.item_money,0) ), 2)  as 'money_10',
   FORMAT(SUM(IF(MONTH(a.regdate) = 10,r.Collected,0) ), 2) as 'col_10',
   FORMAT(SUM(IF(MONTH(a.regdate) = 10,c.Compensated,0) ), 2) as 'com_10',
   
   FORMAT(SUM(IF(MONTH(a.regdate) = 11,1,0) ), 0)  as 'M11',
   FORMAT(SUM(IF(MONTH(a.regdate) = 11,a.item_money,0) ), 2) as 'money_11',
   FORMAT(SUM(IF(MONTH(a.regdate) = 11,r.Collected,0) ), 2) as 'col_11',
   FORMAT(SUM(IF(MONTH(a.regdate) = 11,c.Compensated,0) ), 2) as 'com_11',
   
   FORMAT(SUM(IF(MONTH(a.regdate) = 12,1,0) ), 0)  as 'M12',
   FORMAT(SUM(IF(MONTH(a.regdate) = 12,a.item_money,0) ), 2) as 'money_12',
   FORMAT(SUM(IF(MONTH(a.regdate) = 12,r.Collected,0) ), 2) as 'col_12',
   FORMAT(SUM(IF(MONTH(a.regdate) = 12,c.Compensated,0) ), 2) as 'com_12',
   
   FORMAT(SUM(IF(MONTH(a.regdate) = 01,1,0) ), 0) as 'M01',
   FORMAT(SUM(IF(MONTH(a.regdate) = 01,a.item_money,0) ), 2) as 'money_01',
   FORMAT(SUM(IF(MONTH(a.regdate) = 01,r.Collected,0) ), 2) as 'col_01',
   FORMAT(SUM(IF(MONTH(a.regdate) = 01,c.Compensated,0) ), 2) as 'com_01',
   
   FORMAT(SUM(IF(MONTH(a.regdate) = 02,1,0) ), 0)  as 'M02',
   FORMAT(SUM(IF(MONTH(a.regdate) = 02,a.item_money,0) ), 2) as 'money_02',
   FORMAT(SUM(IF(MONTH(a.regdate) = 02,r.Collected,0) ), 2) as 'col_02',
   FORMAT(SUM(IF(MONTH(a.regdate) = 02,c.Compensated,0) ), 2) as 'com_02',
   
   FORMAT(SUM(IF(MONTH(a.regdate) = 03,1,0) ),0) as 'M03',
   FORMAT(SUM(IF(MONTH(a.regdate) = 03,a.item_money,0) ),2) as 'money_03',
   FORMAT(SUM(IF(MONTH(a.regdate) = 03,r.Collected,0) ),2) as 'col_03',
   FORMAT(SUM(IF(MONTH(a.regdate) = 03,c.Compensated,0) ),2) as 'com_03',
   
   FORMAT(SUM(IF(MONTH(a.regdate) = 04,1,0) ),0) as 'M04',
   FORMAT(SUM(IF(MONTH(a.regdate) = 04,a.item_money,0) ),2) as 'money_04',
   FORMAT(SUM(IF(MONTH(a.regdate) = 04,r.Collected,0) ),2) as 'col_04',
   FORMAT(SUM(IF(MONTH(a.regdate) = 04,c.Compensated,0) ),2) as 'com_04',
   
   FORMAT(SUM(IF(MONTH(a.regdate) = 05,1,0) ),0) as 'M05',
   FORMAT(SUM(IF(MONTH(a.regdate) = 05,a.item_money,0) ),2) as 'money_05',
   FORMAT(SUM(IF(MONTH(a.regdate) = 05,r.Collected,0) ),2) as 'col_05',
   FORMAT(SUM(IF(MONTH(a.regdate) = 05,c.Compensated,0) ),2) as 'com_05',
   
   FORMAT(SUM(IF(MONTH(a.regdate) = 06,1,0) ),0) as 'M06',
   FORMAT(SUM(IF(MONTH(a.regdate) = 06,a.item_money,0) ),2) as 'money_06',
   FORMAT(SUM(IF(MONTH(a.regdate) = 06,r.Collected,0) ),2) as 'col_06',
   FORMAT(SUM(IF(MONTH(a.regdate) = 06,c.Compensated,0) ),2) as 'com_06',
   
   FORMAT(SUM(IF(MONTH(a.regdate) = 07,1,0) ),0) as 'M07',
   FORMAT(SUM(IF(MONTH(a.regdate) = 07,a.item_money,0) ),2) as 'money_07',
   FORMAT(SUM(IF(MONTH(a.regdate) = 07,r.Collected,0) ),2) as 'col_07',
   FORMAT(SUM(IF(MONTH(a.regdate) = 07,c.Compensated,0) ),2) as 'com_07',
   
   FORMAT(SUM(IF(MONTH(a.regdate) = 08,1,0) ),0) as 'M08',
   FORMAT(SUM(IF(MONTH(a.regdate) = 08,a.item_money,0) ),2) as 'money_08',
   FORMAT(SUM(IF(MONTH(a.regdate) = 08,r.Collected,0) ),2) as 'col_08',
   FORMAT(SUM(IF(MONTH(a.regdate) = 08,c.Compensated,0) ),2) as 'com_08',
   
   FORMAT(SUM(IF(MONTH(a.regdate) = 09,1,0) ),0) as 'M09',
   FORMAT(SUM(IF(MONTH(a.regdate) = 09,a.item_money,0) ),2) as 'money_09',
   FORMAT(SUM(IF(MONTH(a.regdate) = 09,r.Collected,0) ),2) as 'col_09',
   FORMAT(SUM(IF(MONTH(a.regdate) = 09,c.Compensated,0) ),2) as 'com_09'
   FROM an_stat a
   LEFT JOIN pttype p ON a.pttype = p.pttype
   LEFT JOIN rcmdb.repdata r ON a.an = r.an
   LEFT JOIN rcmdb.repeclaim c ON r.ID = c.ID
   LEFT JOIN pttype_eclaim pe ON p.pttype_eclaim_id = pe.code
   WHERE a.regdate BETWEEN '2022-10-01' AND '2023-09-30'
   GROUP BY pe.ar_ipd
   `;
      const query = await dbHos.raw(sql);
      res.json({ status: 200, results: query[0] });
    } catch (error: any) {
      res.json({ status: 500, results: error.message });
    }
  }
);

//ipd group
dbudgetRoutes.get(
  "/ipd-group-rep",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      var sql = `SELECT
    pe.code,
    #pttype.name,
    pe.name,
    FORMAT(SUM(IF(MONTH(a.regdate) = 10,1,0) ), 0) as 'H10',
    FORMAT(SUM(IF(MONTH(rep.AdmDate) = 10,1,0) ), 0) as 'R10',
    FORMAT(SUM(IF(MONTH(a.regdate) = 11,1,0) ), 0) as 'H11',
    FORMAT(SUM(IF(MONTH(rep.AdmDate) = 11,1,0) ), 0) as 'R11',
    FORMAT(SUM(IF(MONTH(a.regdate) = 12,1,0) ), 0) as 'H12',
    FORMAT(SUM(IF(MONTH(rep.AdmDate) = 12,1,0) ), 0) as 'R12',
    FORMAT(SUM(IF(MONTH(a.regdate) = 01,1,0) ), 0) as 'H01',
    FORMAT(SUM(IF(MONTH(rep.AdmDate) = 01,1,0) ), 0) as 'R01',
    FORMAT(SUM(IF(MONTH(a.regdate) = 02,1,0) ), 0) as 'H02',
    FORMAT(SUM(IF(MONTH(rep.AdmDate) = 02,1,0) ), 0) as 'R02',
    FORMAT(SUM(IF(MONTH(a.regdate) = 03,1,0) ), 0) as 'H03',
    FORMAT(SUM(IF(MONTH(rep.AdmDate) = 03,1,0) ), 0) as 'R03',
    FORMAT(SUM(IF(MONTH(a.regdate) = 04,1,0) ), 0) as 'H04',
    FORMAT(SUM(IF(MONTH(rep.AdmDate) = 04,1,0) ), 0) as 'R04',
    FORMAT(SUM(IF(MONTH(a.regdate) = 05,1,0) ), 0) as 'H05',
    FORMAT(SUM(IF(MONTH(rep.AdmDate) = 05,1,0) ), 0) as 'R05',
    FORMAT(SUM(IF(MONTH(a.regdate) = 06,1,0) ), 0) as 'H06',
    FORMAT(SUM(IF(MONTH(rep.AdmDate) = 06,1,0) ), 0) as 'R06',
    FORMAT(SUM(IF(MONTH(a.regdate) = 07,1,0) ), 0) as 'H07',
    FORMAT(SUM(IF(MONTH(rep.AdmDate) = 07,1,0) ), 0) as 'R07',
    FORMAT(SUM(IF(MONTH(a.regdate) = 08,1,0) ), 0) as 'H08',
    FORMAT(SUM(IF(MONTH(rep.AdmDate) = 08,1,0) ), 0) as 'R08',
    FORMAT(SUM(IF(MONTH(a.regdate) = 09,1,0) ), 0) as 'H09',
    FORMAT(SUM(IF(MONTH(rep.AdmDate) = 09,1,0) ), 0) as 'R09',
    COUNT(a.an) as AN_Hos,
    COUNT(rep.AN) as AN_REP
    FROM an_stat a
    INNER JOIN patient p ON a.hn = p.hn
    LEFT JOIN (SELECT
    r.AN,
    r.ID,
    r.PID,
    r.PtName,
    r.AdmDate,
    r.Collected
    FROM an_stat a
    INNER JOIN rcmdb.repdata r ON a.an = r.AN
    WHERE a.regdate BETWEEN '2022-10-01' AND '2023-09-30') rep ON a.an = rep.AN
    LEFT JOIN pttype ON a.pttype = pttype.pttype
    LEFT JOIN pttype_eclaim pe ON pttype.pttype_eclaim_id = pe.code
    WHERE a.regdate BETWEEN '2022-10-01' AND '2023-09-30'
    GROUP BY pttype.pttype_eclaim_id 
    ORDER BY COUNT(a.an)  DESC
    `;
      const query = await dbHos.raw(sql);
      res.json({ status: 200, results: query[0] });
    } catch (error: any) {
      res.json({ status: 500, results: error.message });
    }
  }
);
dbudgetRoutes.get(
  "/ipd-hos-rep",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      var sql = `SELECT
    a.pttype,
    pttype.name,
    FORMAT(SUM(IF(MONTH(a.regdate) = 10,1,0) ), 0) as 'H10',
    FORMAT(SUM(IF(MONTH(rep.AdmDate) = 10,1,0) ), 0) as 'R10',
    FORMAT(SUM(IF(MONTH(a.regdate) = 11,1,0) ), 0) as 'H11',
    FORMAT(SUM(IF(MONTH(rep.AdmDate) = 11,1,0) ), 0) as 'R11',
    FORMAT(SUM(IF(MONTH(a.regdate) = 12,1,0) ), 0) as 'H12',
    FORMAT(SUM(IF(MONTH(rep.AdmDate) = 12,1,0) ), 0) as 'R12',
    FORMAT(SUM(IF(MONTH(a.regdate) = 01,1,0) ), 0) as 'H01',
    FORMAT(SUM(IF(MONTH(rep.AdmDate) = 01,1,0) ), 0) as 'R01',
    FORMAT(SUM(IF(MONTH(a.regdate) = 02,1,0) ), 0) as 'H02',
    FORMAT(SUM(IF(MONTH(rep.AdmDate) = 02,1,0) ), 0) as 'R02',
    FORMAT(SUM(IF(MONTH(a.regdate) = 03,1,0) ), 0) as 'H03',
    FORMAT(SUM(IF(MONTH(rep.AdmDate) = 03,1,0) ), 0) as 'R03',
    FORMAT(SUM(IF(MONTH(a.regdate) = 04,1,0) ), 0) as 'H04',
    FORMAT(SUM(IF(MONTH(rep.AdmDate) = 04,1,0) ), 0) as 'R04',
    FORMAT(SUM(IF(MONTH(a.regdate) = 05,1,0) ), 0) as 'H05',
    FORMAT(SUM(IF(MONTH(rep.AdmDate) = 05,1,0) ), 0) as 'R05',
    FORMAT(SUM(IF(MONTH(a.regdate) = 06,1,0) ), 0) as 'H06',
    FORMAT(SUM(IF(MONTH(rep.AdmDate) = 06,1,0) ), 0) as 'R06',
    FORMAT(SUM(IF(MONTH(a.regdate) = 07,1,0) ), 0) as 'H07',
    FORMAT(SUM(IF(MONTH(rep.AdmDate) = 07,1,0) ), 0) as 'R07',
    FORMAT(SUM(IF(MONTH(a.regdate) = 08,1,0) ), 0) as 'H08',
    FORMAT(SUM(IF(MONTH(rep.AdmDate) = 08,1,0) ), 0) as 'R08',
    FORMAT(SUM(IF(MONTH(a.regdate) = 09,1,0) ), 0) as 'H09',
    FORMAT(SUM(IF(MONTH(rep.AdmDate) = 09,1,0) ), 0) as 'R09',
    FORMAT(COUNT(a.an) ,0) as AN_Hos,
      FORMAT(COUNT(rep.AN) ,0) as AN_REP
    FROM an_stat a
    INNER JOIN patient p ON a.hn = p.hn
    LEFT JOIN (SELECT
    r.AN,
    r.ID,
    r.PID,
    r.PtName,
    r.AdmDate,
    r.Collected
    FROM an_stat a
    INNER JOIN rcmdb.repdata r ON a.an = r.AN
    WHERE a.regdate BETWEEN '2022-10-01' AND '2023-09-30') rep ON a.an = rep.AN
    LEFT JOIN pttype ON a.pttype = pttype.pttype
    WHERE a.regdate BETWEEN '2022-10-01' AND '2023-09-30'
    GROUP BY a.pttype
    ORDER BY COUNT(a.an) DESC
    `;
      const query = await dbHos.raw(sql);
      res.json({ status: 200, results: query[0] });
    } catch (error: any) {
      res.json({ status: 500, results: error.message });
    }
  }
);
dbudgetRoutes.get("/visit-ipd-10", verifyToken, async (req, res: Response) => {
  try {
    var sql = `SELECT
    pe.name,
    pttype.hipdata_code,
    FORMAT(COUNT(a.an),0) as count,
    FORMAT(SUM(a.item_money),2) as money,
    FORMAT(SUM(r.Collected),2 )as collected,
    FORMAT(SUM(c.Compensated),2) as compensated
    FROM an_stat a
    LEFT JOIN rcmdb.repdata r ON a.an = r.an
    LEFT JOIN rcmdb.repeclaim c ON a.an = c.an
    LEFT JOIN pttype ON a.pttype = pttype.pttype
    LEFT JOIN pttype_eclaim pe ON pttype.pttype_eclaim_id = pe.code
    WHERE
    a.regdate BETWEEN '2022-10-01'  AND '2022-10-31'
    GROUP BY pttype.hipdata_code
    ORDER BY SUM(a.item_money) DESC`;
    const query = await dbHos.raw(sql);
    res.json({ status: 200, results: query[0] });
  } catch (error: any) {
    res.json({ status: 500, results: error.message });
  }
});
dbudgetRoutes.get("/visit-ipd-11", verifyToken, async (req, res: Response) => {
  try {
    var sql = `SELECT
    pe.name,
    pttype.hipdata_code,
    FORMAT(COUNT(a.an),0) as count,
    FORMAT(SUM(a.item_money),2) as money,
    FORMAT(SUM(r.Collected),2 )as collected,
    FORMAT(SUM(c.Compensated),2) as compensated
    FROM an_stat a
    LEFT JOIN rcmdb.repdata r ON a.an = r.an
    LEFT JOIN rcmdb.repeclaim c ON a.an = c.an
    LEFT JOIN pttype ON a.pttype = pttype.pttype
    LEFT JOIN pttype_eclaim pe ON pttype.pttype_eclaim_id = pe.code
    WHERE
    a.regdate BETWEEN '2022-11-01'  AND '2022-11-30'
    GROUP BY pe.name
    ORDER BY SUM(a.item_money) DESC`;
    const query = await dbHos.raw(sql);
    res.json({ status: 200, results: query[0] });
  } catch (error: any) {
    res.json({ status: 500, results: error.message });
  }
});
dbudgetRoutes.get("/visit-ipd-12", verifyToken, async (req, res: Response) => {
  try {
    var sql = `SELECT
    pe.name,
    pttype.hipdata_code,
    FORMAT(COUNT(a.an),0) as count,
    FORMAT(SUM(a.item_money),2) as money,
    FORMAT(SUM(r.Collected),2 )as collected,
    FORMAT(SUM(c.Compensated),2) as compensated
    FROM an_stat a
    LEFT JOIN rcmdb.repdata r ON a.an = r.an
    LEFT JOIN rcmdb.repeclaim c ON a.an = c.an
    LEFT JOIN pttype ON a.pttype = pttype.pttype
    LEFT JOIN pttype_eclaim pe ON pttype.pttype_eclaim_id = pe.code
    WHERE
    a.regdate BETWEEN '2022-12-01'  AND '2022-12-31'
    GROUP BY pe.name
    ORDER BY SUM(a.item_money) DESC`;
    const query = await dbHos.raw(sql);
    res.json({ status: 200, results: query[0] });
  } catch (error: any) {
    res.json({ status: 500, results: error.message });
  }
});
dbudgetRoutes.get("/visit-ipd-1", verifyToken, async (req, res: Response) => {
  try {
    var sql = `SELECT
  pe.name,
  pttype.hipdata_code,
  FORMAT(COUNT(a.an),0) as count,
  FORMAT(SUM(a.item_money),2) as money,
  FORMAT(SUM(r.Collected),2 )as collected,
  FORMAT(SUM(c.Compensated),2) as compensated
  FROM an_stat a
  LEFT JOIN rcmdb.repdata r ON a.an = r.an
  LEFT JOIN rcmdb.repeclaim c ON a.an = c.an
  LEFT JOIN pttype ON a.pttype = pttype.pttype
  LEFT JOIN pttype_eclaim pe ON pttype.pttype_eclaim_id = pe.code
  WHERE
  a.regdate BETWEEN '2023-01-01'  AND '2023-01-31'
  GROUP BY pe.name
  ORDER BY SUM(a.item_money) DESC`;
    const query = await dbHos.raw(sql);
    res.json({ status: 200, results: query[0] });
  } catch (error: any) {
    res.json({ status: 500, results: error.message });
  }
});
dbudgetRoutes.get(
  "/visit-ipd-2",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      var sql = `SELECT
  pe.name,
  pttype.hipdata_code,
  FORMAT(COUNT(a.an),0) as count,
  FORMAT(SUM(a.item_money),2) as money,
  FORMAT(SUM(r.Collected),2 )as collected,
  FORMAT(SUM(c.Compensated),2) as compensated
  FROM an_stat a
  LEFT JOIN rcmdb.repdata r ON a.an = r.an
  LEFT JOIN rcmdb.repeclaim c ON a.an = c.an
  LEFT JOIN pttype ON a.pttype = pttype.pttype
  LEFT JOIN pttype_eclaim pe ON pttype.pttype_eclaim_id = pe.code
  WHERE
  a.regdate BETWEEN '2023-02-01'  AND '2023-02-29'
  GROUP BY pe.name
  ORDER BY SUM(a.item_money) DESC`;
      const query = await dbHos.raw(sql);
      res.json({ status: 200, results: query[0] });
    } catch (error: any) {
      res.json({ status: 500, results: error.message });
    }
  }
);

dbudgetRoutes.get(
  "/visit-ipd-3",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      var sql = `SELECT
  pe.name,
  pttype.hipdata_code,
  FORMAT(COUNT(a.an),0) as count,
  FORMAT(SUM(a.item_money),2) as money,
  FORMAT(SUM(r.Collected),2 )as collected,
  FORMAT(SUM(c.Compensated),2) as compensated
  FROM an_stat a
  LEFT JOIN rcmdb.repdata r ON a.an = r.an
  LEFT JOIN rcmdb.repeclaim c ON a.an = c.an
  LEFT JOIN pttype ON a.pttype = pttype.pttype
  LEFT JOIN pttype_eclaim pe ON pttype.pttype_eclaim_id = pe.code
  WHERE
  a.regdate BETWEEN '2023-03-01'  AND '2023-03-31'
  GROUP BY pe.name
  ORDER BY SUM(a.item_money) DESC`;
      const query = await dbHos.raw(sql);
      res.json({ status: 200, results: query[0] });
    } catch (error: any) {
      res.json({ status: 500, results: error.message });
    }
  }
);

/* GET IPD */
dbudgetRoutes.get(
  "/repdata",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      var sql = `SELECT
    r.MainInscl,
    FORMAT(SUM(IF(MONTH(r.AdmDate) = 10,1,0) ), 0) as 'M10',
    FORMAT(SUM(IF(MONTH(r.AdmDate) = 11,1,0) ), 0) as 'M11',
    FORMAT(SUM(IF(MONTH(r.AdmDate) = 12,1,0) ), 0) as 'M12',
    FORMAT(SUM(IF(MONTH(r.AdmDate) = 01,1,0) ), 0) as 'M01',
    FORMAT(SUM(IF(MONTH(r.AdmDate) = 02,1,0) ), 0) as 'M02',
    FORMAT(SUM(IF(MONTH(r.AdmDate) = 03,1,0) ), 0) as 'M03',
    FORMAT(SUM(IF(MONTH(r.AdmDate) = 04,1,0) ), 0) as 'M04',
    FORMAT(SUM(IF(MONTH(r.AdmDate) = 05,1,0) ), 0) as 'M05',
    FORMAT(SUM(IF(MONTH(r.AdmDate) = 06,1,0) ), 0) as 'M06',
    FORMAT(SUM(IF(MONTH(r.AdmDate) = 07,1,0) ), 0) as 'M07',
    FORMAT(SUM(IF(MONTH(r.AdmDate) = 08,1,0) ), 0) as 'M08',
    FORMAT(SUM(IF(MONTH(r.AdmDate) = 09,1,0) ), 0) as 'M09'
    FROM repdata r
    WHERE  
    r.AdmDate BETWEEN '2022-10-01' AND '2023-09-30'
    GROUP BY r.MainInscl `;
      const query = await dbRcm.raw(sql);
      res.json({ status: 200, results: query[0] });
    } catch (error: any) {
      res.json({ status: 500, results: error.message });
    }
  }
);

dbudgetRoutes.get(
  "/opd-hos-rep",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      var sql = `SELECT
  v.pttype,
  pttype.name,
  FORMAT(SUM(IF(MONTH(v.vstdate) = 10,1,0) ), 0) as 'H10',
  FORMAT(SUM(IF(MONTH(rep.AdmDate) = 10,1,0) ), 0) as 'R10',
  FORMAT(SUM(IF(MONTH(v.vstdate) = 11,1,0) ), 0) as 'H11',
  FORMAT(SUM(IF(MONTH(rep.AdmDate) = 11,1,0) ), 0) as 'R11',
  FORMAT(SUM(IF(MONTH(v.vstdate) = 12,1,0) ), 0) as 'H12',
  FORMAT(SUM(IF(MONTH(rep.AdmDate) = 12,1,0) ), 0) as 'R12',
  FORMAT(SUM(IF(MONTH(v.vstdate) = 01,1,0) ), 0) as 'H01',
  FORMAT(SUM(IF(MONTH(rep.AdmDate) = 01,1,0) ), 0) as 'R01',
  FORMAT(SUM(IF(MONTH(v.vstdate) = 02,1,0) ), 0) as 'H02',
  FORMAT(SUM(IF(MONTH(rep.AdmDate) = 02,1,0) ), 0) as 'R02',
  FORMAT(SUM(IF(MONTH(v.vstdate) = 03,1,0) ), 0) as 'H03',
  FORMAT(SUM(IF(MONTH(rep.AdmDate) = 03,1,0) ), 0) as 'R03',
  FORMAT(SUM(IF(MONTH(v.vstdate) = 04,1,0) ), 0) as 'H04',
  FORMAT(SUM(IF(MONTH(rep.AdmDate) = 04,1,0) ), 0) as 'R04',
  FORMAT(SUM(IF(MONTH(v.vstdate) = 05,1,0) ), 0) as 'H05',
  FORMAT(SUM(IF(MONTH(rep.AdmDate) = 05,1,0) ), 0) as 'R05',
  FORMAT(SUM(IF(MONTH(v.vstdate) = 06,1,0) ), 0) as 'H06',
  FORMAT(SUM(IF(MONTH(rep.AdmDate) = 06,1,0) ), 0) as 'R06',
  FORMAT(SUM(IF(MONTH(v.vstdate) = 07,1,0) ), 0) as 'H07',
  FORMAT(SUM(IF(MONTH(rep.AdmDate) = 07,1,0) ), 0) as 'R07',
  FORMAT(SUM(IF(MONTH(v.vstdate) = 08,1,0) ), 0) as 'H08',
  FORMAT(SUM(IF(MONTH(rep.AdmDate) = 08,1,0) ), 0) as 'R08',
  FORMAT(SUM(IF(MONTH(v.vstdate) = 09,1,0) ), 0) as 'H09',
  FORMAT(SUM(IF(MONTH(rep.AdmDate) = 09,1,0) ), 0) as 'R09',
  FORMAT(COUNT(v.vn) ,0) as VN_Hos,
	FORMAT(COUNT(rep.VN) ,0) as VN_REP
  FROM vn_stat v
  INNER JOIN patient p ON v.hn = p.hn
  LEFT JOIN (SELECT
  r.VN,
  r.ID,
  r.PID,
  r.PtName,
  r.AdmDate,
  r.Collected
  FROM vn_stat v
  INNER JOIN rcmdb.repdata r ON v.vn = r.vn
  WHERE v.vstdate BETWEEN '2022-10-01' AND '2023-09-30') rep ON v.vn = rep.vn
  LEFT JOIN pttype ON v.pttype = pttype.pttype
  WHERE v.vstdate BETWEEN '2022-10-01' AND '2023-09-30'
  GROUP BY v.pttype
  ORDER BY COUNT(v.vn) DESC
  `;
      const query = await dbHos.raw(sql);
      res.json({ status: 200, results: query[0] });
    } catch (error: any) {
      res.json({ status: 500, results: error.message });
    }
  }
);
dbudgetRoutes.get(
  "/seamless-sum",
  verifyToken,
  async (req: Request, res: Response) => {
    // const { pttype } = req.params;

    try {
      var sql = `SELECT
  s.Fund,
  LEFT(s.Rep,4) as fund_code,
  FORMAT(COUNT(s.ID),0) as total,
  FORMAT(SUM(IF(s.Status ='ชดเชย',1,0)),0) as t_Compensated,
  FORMAT(SUM(s.Compensated),2) as Compensated,
  FORMAT(SUM(IF(s.Status ='ไม่ชดเชย',1,0)),0) as t_NoCompensated,
  FORMAT(SUM(s.NoCompensated),2) as NoCompensated
  FROM seamless s
  WHERE s.AdmDate BETWEEN '2022-10-01' AND '2023-09-30'
  GROUP BY s.Fund 
  `;
      const query = await dbRcm.raw(sql);
      res.json({ status: 200, results: query[0] });
    } catch (error: any) {
      res.json({ status: 500, results: error.message });
    }
  }
);

dbudgetRoutes.get(
  "/seamless-tb",
  verifyToken,
  async (req: Request, res: Response) => {
    // const { pttype } = req.params;

    try {
      var sql = `SELECT
    s.ID,
    s.Fund,
    S.Rep,
    s.VN,
    s.HN,
    s.AN,
    s.PID,
    s.Ptname,
    s.AdmDate,
    s.MainInscl,
    s.HCode,
    s.Type,
    s.SerialNo,
    s.SendDate,
    s.PayNo,
    s.PayDate,
    s.Collected,
    s.Compensated,
    s.NoCompensated,
    s.PayMore,
    s.Recall,
    s.Status
    FROM seamless s
    WHERE s.AdmDate BETWEEN '2022-10-01' AND '2023-09-30'
    AND  LEFT(s.Rep,4) = 'DMTB'
    `;
      const query = await dbRcm.raw(sql);
      res.json({ status: 200, results: query[0] });
    } catch (error: any) {
      res.json({ status: 500, results: error.message });
    }
  }
);

dbudgetRoutes.get(
  "/seamless-dow",
  verifyToken,
  async (req: Request, res: Response) => {
    // const { pttype } = req.params;

    try {
      var sql = `SELECT
  s.ID,
  s.Fund,
  S.Rep,
  s.VN,
  s.HN,
  s.AN,
  s.PID,
  s.Ptname,
  s.AdmDate,
  s.MainInscl,
  s.HCode,
  s.Type,
  s.SerialNo,
  s.SendDate,
  s.PayNo,
  s.PayDate,
  s.Collected,
  s.Compensated,
  s.NoCompensated,
  s.PayMore,
  s.Recall,
  s.Status
  FROM seamless s
  WHERE s.AdmDate BETWEEN '2022-10-01' AND '2023-09-30'
  AND  LEFT(s.Rep,4) = 'DDOW'
  `;
      const query = await dbRcm.raw(sql);
      res.json({ status: 200, results: query[0] });
    } catch (error: any) {
      res.json({ status: 500, results: error.message });
    }
  }
);

dbudgetRoutes.get(
  "/chart-ipd/",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      var sql = `SELECT
  a.pttype,
  pttype.name as pttype_name,
  pttype.pttype_eclaim_id,
  pc.income_ipd,
  pc.name,
  FORMAT(SUM(a.item_money), 2) as 'HosXP',
  FORMAT(SUM(rep.Collected), 2) as 'Send',
  FORMAT(SUM(rep.Compensated), 2) as 'Paid'
  FROM an_stat a
  INNER JOIN patient p ON a.hn = p.hn
  LEFT JOIN (SELECT
  r.AN,
  r.ID,
  r.PID,
  r.PtName,
  r.AdmDate,
  r.Collected,
  rc.Compensated
  FROM an_stat a
  INNER JOIN rcmdb.repdata r ON a.an = r.AN
  LEFT JOIN rcmdb.repeclaim rc ON a.an = rc.AN
  WHERE a.regdate BETWEEN '2022-10-01' AND '2023-09-30') rep ON a.an = rep.AN
  LEFT JOIN pttype ON a.pttype = pttype.pttype
  LEFT JOIN pttype_eclaim pc ON pttype.pttype_eclaim_id = pc.code
  WHERE a.regdate BETWEEN '2022-10-01' AND '2023-09-30'
  GROUP BY pc.income_ipd
  ORDER BY pttype.pttype_eclaim_id
  `;
      const query = await dbHos.raw(sql);
      res.json({ status: 200, results: query[0] });
    } catch (error: any) {
      res.json({ status: 500, results: error.message });
    }
  }
);
dbudgetRoutes.get("/opd-group-rep", verifyToken, async (req, res) => {
  try {
    var sql = `SELECT
  pe.code,
  #pttype.name,
  pe.name,
  FORMAT(SUM(IF(MONTH(v.vstdate) = 10,1,0) ), 0) as 'H10',
  FORMAT(SUM(IF(MONTH(rep.AdmDate) = 10,1,0) ), 0) as 'R10',
  FORMAT(SUM(IF(MONTH(v.vstdate) = 11,1,0) ), 0) as 'H11',
  FORMAT(SUM(IF(MONTH(rep.AdmDate) = 11,1,0) ), 0) as 'R11',
  FORMAT(SUM(IF(MONTH(v.vstdate) = 12,1,0) ), 0) as 'H12',
  FORMAT(SUM(IF(MONTH(rep.AdmDate) = 12,1,0) ), 0) as 'R12',
  FORMAT(SUM(IF(MONTH(v.vstdate) = 01,1,0) ), 0) as 'H01',
  FORMAT(SUM(IF(MONTH(rep.AdmDate) = 01,1,0) ), 0) as 'R01',
  FORMAT(SUM(IF(MONTH(v.vstdate) = 02,1,0) ), 0) as 'H02',
  FORMAT(SUM(IF(MONTH(rep.AdmDate) = 02,1,0) ), 0) as 'R02',
  FORMAT(SUM(IF(MONTH(v.vstdate) = 03,1,0) ), 0) as 'H03',
  FORMAT(SUM(IF(MONTH(rep.AdmDate) = 03,1,0) ), 0) as 'R03',
  FORMAT(SUM(IF(MONTH(v.vstdate) = 04,1,0) ), 0) as 'H04',
  FORMAT(SUM(IF(MONTH(rep.AdmDate) = 04,1,0) ), 0) as 'R04',
  FORMAT(SUM(IF(MONTH(v.vstdate) = 05,1,0) ), 0) as 'H05',
  FORMAT(SUM(IF(MONTH(rep.AdmDate) = 05,1,0) ), 0) as 'R05',
  FORMAT(SUM(IF(MONTH(v.vstdate) = 06,1,0) ), 0) as 'H06',
  FORMAT(SUM(IF(MONTH(rep.AdmDate) = 06,1,0) ), 0) as 'R06',
  FORMAT(SUM(IF(MONTH(v.vstdate) = 07,1,0) ), 0) as 'H07',
  FORMAT(SUM(IF(MONTH(rep.AdmDate) = 07,1,0) ), 0) as 'R07',
  FORMAT(SUM(IF(MONTH(v.vstdate) = 08,1,0) ), 0) as 'H08',
  FORMAT(SUM(IF(MONTH(rep.AdmDate) = 08,1,0) ), 0) as 'R08',
  FORMAT(SUM(IF(MONTH(v.vstdate) = 09,1,0) ), 0) as 'H09',
  FORMAT(SUM(IF(MONTH(rep.AdmDate) = 09,1,0) ), 0) as 'R09',
  FORMAT(COUNT(v.vn) ,0) as VN_Hos,
	FORMAT(COUNT(rep.VN) ,0) as VN_REP
  FROM vn_stat v
  INNER JOIN patient p ON v.hn = p.hn
  LEFT JOIN (SELECT
  r.VN,
  r.ID,
  r.PID,
  r.PtName,
  r.AdmDate,
  r.Collected
  FROM vn_stat v
  INNER JOIN rcmdb.repdata r ON v.vn = r.vn
  WHERE v.vstdate BETWEEN '2022-10-01' AND '2023-09-30') rep ON v.vn = rep.vn
  LEFT JOIN pttype ON v.pttype = pttype.pttype
	LEFT JOIN pttype_eclaim pe ON pttype.pttype_eclaim_id = pe.code
  WHERE v.vstdate BETWEEN '2022-10-01' AND '2023-09-30'
  GROUP BY pttype.pttype_eclaim_id 
  ORDER BY COUNT(v.vn) DESC
  `;
    const query = await dbHos.raw(sql);
    res.json({ status: 200, results: query[0] });
  } catch (error: any) {
    res.json({ status: 500, results: error.message });
  }
});
dbudgetRoutes.get(
  "/visit-opd",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      var sql = `SELECT
   pe.name,
   pttype.hipdata_code,
   FORMAT(COUNT(v.vn),0) as count,
   FORMAT(SUM(v.item_money),2) as money,
   FORMAT(SUM(r.Collected),2) as collected,
   FORMAT(SUM(c.Compensated),2) as compensated
   FROM vn_stat v
   LEFT JOIN rcmdb.repdata r ON v.vn = r.vn
   LEFT JOIN rcmdb.repeclaim c ON v.vn = c.vn
   LEFT JOIN pttype ON v.pttype = pttype.pttype
   LEFT JOIN pttype_eclaim pe ON pttype.pttype_eclaim_id = pe.code
   WHERE
   v.vstdate = current_date
   GROUP BY pe.name
   ORDER BY SUM(v.item_money) DESC`;
      const query = await dbHos.raw(sql);
      res.json({ status: 200, results: query[0] });
    } catch (error: any) {
      res.json({ status: 500, results: error.message });
    }
  }
);

dbudgetRoutes.get(
  "/visit-opd-10",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      var sql = `SELECT
   pe.name,
   pttype.hipdata_code,
   FORMAT(COUNT(v.vn),0) as count,
   FORMAT(SUM(v.item_money),2) as money,
   FORMAT(SUM(r.Collected),2) as collected,
   FORMAT(SUM(c.Compensated),2) as compensated
   FROM vn_stat v
   LEFT JOIN rcmdb.repdata r ON v.vn = r.vn
   LEFT JOIN rcmdb.repeclaim c ON v.vn = c.vn
   LEFT JOIN pttype ON v.pttype = pttype.pttype
   LEFT JOIN pttype_eclaim pe ON pttype.pttype_eclaim_id = pe.code
   WHERE
   v.vstdate BETWEEN '2022-10-01'  AND '2022-10-31'
   GROUP BY pe.name
   ORDER BY SUM(v.item_money) DESC`;
      const query = await dbHos.raw(sql);
      res.json({ status: 200, results: query[0] });
    } catch (error: any) {
      res.json({ status: 500, results: error.message });
    }
  }
);

dbudgetRoutes.get(
  "/visit-opd-11",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      var sql = `SELECT
   pe.name,
   pttype.hipdata_code,
   FORMAT(COUNT(v.vn),0) as count,
   FORMAT(SUM(v.item_money),2) as money,
   FORMAT(SUM(r.Collected),2) as collected,
   FORMAT(SUM(c.Compensated),2) as compensated
   FROM vn_stat v
   LEFT JOIN rcmdb.repdata r ON v.vn = r.vn
   LEFT JOIN rcmdb.repeclaim c ON v.vn = c.vn
   LEFT JOIN pttype ON v.pttype = pttype.pttype
   LEFT JOIN pttype_eclaim pe ON pttype.pttype_eclaim_id = pe.code
   WHERE
   v.vstdate BETWEEN '2022-11-01'  AND '2022-11-31'
   GROUP BY pe.name
   ORDER BY SUM(v.item_money) DESC`;
      const query = await dbHos.raw(sql);
      res.json({ status: 200, results: query[0] });
    } catch (error: any) {
      res.json({ status: 500, results: error.message });
    }
  }
);

dbudgetRoutes.get(
  "/visit-opd-12",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      var sql = `SELECT
    pe.name,
    pttype.hipdata_code,
    FORMAT(COUNT(v.vn),0) as count,
    FORMAT(SUM(v.item_money),2) as money,
    FORMAT(SUM(r.Collected),2) as collected,
    FORMAT(SUM(c.Compensated),2) as compensated
    FROM vn_stat v
    LEFT JOIN rcmdb.repdata r ON v.vn = r.vn
    LEFT JOIN rcmdb.repeclaim c ON v.vn = c.vn
    LEFT JOIN pttype ON v.pttype = pttype.pttype
    LEFT JOIN pttype_eclaim pe ON pttype.pttype_eclaim_id = pe.code
    WHERE
    v.vstdate BETWEEN '2022-11-01'  AND '2022-11-30'
    GROUP BY pe.name
    ORDER BY SUM(v.item_money) DESC`;
      const query = await dbHos.raw(sql);
      res.json({ status: 200, results: query[0] });
    } catch (error: any) {
      res.json({ status: 500, results: error.message });
    }
  }
);

dbudgetRoutes.get(
  "/visit-opd-1",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      var sql = `SELECT
   pe.name,
   pttype.hipdata_code,
   FORMAT(COUNT(v.vn),0) as count,
   FORMAT(SUM(v.item_money),2) as money,
   FORMAT(SUM(r.Collected),2) as collected,
   FORMAT(SUM(c.Compensated),2) as compensated
   FROM vn_stat v
   LEFT JOIN rcmdb.repdata r ON v.vn = r.vn
   LEFT JOIN rcmdb.repeclaim c ON v.vn = c.vn
   LEFT JOIN pttype ON v.pttype = pttype.pttype
   LEFT JOIN pttype_eclaim pe ON pttype.pttype_eclaim_id = pe.code
   WHERE
   v.vstdate BETWEEN '2023-01-01'  AND '2023-01-31'
   GROUP BY pe.name
   ORDER BY SUM(v.item_money) DESC`;
      const query = await dbHos.raw(sql);
      res.json({ status: 200, results: query[0] });
    } catch (error: any) {
      res.json({ status: 500, results: error.message });
    }
  }
);

dbudgetRoutes.get(
  "/visit-opd-2",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      var sql = `SELECT
    pe.name,
    pttype.hipdata_code,
    FORMAT(COUNT(v.vn),0) as count,
    FORMAT(SUM(v.item_money),2) as money,
    FORMAT(SUM(r.Collected),2) as collected,
    FORMAT(SUM(c.Compensated),2) as compensated
    FROM vn_stat v
    LEFT JOIN rcmdb.repdata r ON v.vn = r.vn
    LEFT JOIN rcmdb.repeclaim c ON v.vn = c.vn
    LEFT JOIN pttype ON v.pttype = pttype.pttype
    LEFT JOIN pttype_eclaim pe ON pttype.pttype_eclaim_id = pe.code
    WHERE
    v.vstdate BETWEEN '2023-02-01'  AND '2023-02-29'
    GROUP BY pe.name
    ORDER BY SUM(v.item_money) DESC`;
      const query = await dbHos.raw(sql);
      res.json({ status: 200, results: query[0] });
    } catch (error: any) {
      res.json({ status: 500, results: error.message });
    }
  }
);

dbudgetRoutes.get(
  "/visit-opd-3",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      var sql = `SELECT
    pe.name,
    pttype.hipdata_code,
    FORMAT(COUNT(v.vn),0) as count,
    FORMAT(SUM(v.item_money),2) as money,
    FORMAT(SUM(r.Collected),2) as collected,
    FORMAT(SUM(c.Compensated),2) as compensated
    FROM vn_stat v
    LEFT JOIN rcmdb.repdata r ON v.vn = r.vn
    LEFT JOIN rcmdb.repeclaim c ON v.vn = c.vn
    LEFT JOIN pttype ON v.pttype = pttype.pttype
    LEFT JOIN pttype_eclaim pe ON pttype.pttype_eclaim_id = pe.code
    WHERE
    v.vstdate BETWEEN '2023-03-01'  AND '2023-03-31'
    GROUP BY pe.name
    ORDER BY SUM(v.item_money) DESC`;
      const query = await dbHos.raw(sql);
      res.json({ status: 200, results: query[0] });
    } catch (error: any) {
      res.json({ status: 500, results: error.message });
    }
  }
);

//seamless
dbudgetRoutes.get(
  "/seamless",
  verifyToken,
  async (req: Request, res: Response) => {
    // const { pttype } = req.params;

    try {
      var sql = `SELECT
  s.Fund,
  LEFT(s.Rep,4) as fund_code,
  FORMAT(SUM(IF(MONTH(s.AdmDate) = 10,1,0) ),0) as m10,
  FORMAT(SUM(IF(MONTH(s.AdmDate) = 10,s.Compensated,0) ),2) as c10,
  FORMAT(SUM(IF(MONTH(s.AdmDate) = 10,s.NoCompensated,0) ),2) as n10,
  FORMAT(SUM(IF(MONTH(s.AdmDate) = 11,1,0) ),0) as m11,
  FORMAT(SUM(IF(MONTH(s.AdmDate) = 11,s.Compensated,0) ),2) as c11,
  FORMAT(SUM(IF(MONTH(s.AdmDate) = 11,s.NoCompensated,0) ),2) as n11,
  FORMAT(SUM(IF(MONTH(s.AdmDate) = 12,1,0) ),0) as m12,
  FORMAT(SUM(IF(MONTH(s.AdmDate) = 12,s.Compensated,0) ),2) as c12,
  FORMAT(SUM(IF(MONTH(s.AdmDate) = 12,s.NoCompensated,0) ),2) as n12,
  FORMAT(SUM(IF(MONTH(s.AdmDate) = 01,1,0) ),0) as m01,
  FORMAT(SUM(IF(MONTH(s.AdmDate) = 01,s.Compensated,0) ),2) as c01,
  FORMAT(SUM(IF(MONTH(s.AdmDate) = 01,s.NoCompensated,0) ),2) as n01,
  COUNT(s.ID) as total,
  SUM(IF(s.Status ='ชดเชย',1,0)) as t_Compensated,
  FORMAT(SUM(s.Compensated),2) as Compensated,
  SUM(IF(s.Status ='ไม่ชดเชย',1,0)) as t_NoCompensated,
  FORMAT(SUM(s.NoCompensated),2) as NoCompensated
  FROM seamless s
  WHERE s.AdmDate BETWEEN '2022-10-01' AND '2023-09-30'
  GROUP BY s.Fund
  `;
      const query = await dbRcm.raw(sql);
      res.json({ status: 200, results: query[0] });
    } catch (error: any) {
      res.json({ status: 500, results: error.message });
    }
  }
);
//  ipd รายตัว
dbudgetRoutes.get(
  "/ipd-hos-rep/:pttype",
  verifyToken,
  async (req: Request, res: Response) => {
    const { pttype } = req.params;

    try {
      var sql = `SELECT
    a.an,
    a.hn,
    CONCAT(p.fname,' ',p.lname) as fullname,
    a.regdate,
    rep.AdmDate,
    a.pttype,
    FORMAT(a.item_money,2) as item_money,
    FORMAT(rep.Collected,2) as Collected,
    FORMAT(SUM(sta.Compensated), 2) as Compensated
    pttype.name as pttype
    FROM an_stat a
    INNER JOIN patient p ON a.hn = p.hn
    LEFT JOIN (SELECT
    r.AN,
    r.VN,
    r.ID,
    r.PID,
    r.PtName,
    r.AdmDate,
    r.Collected
    FROM an_stat a
    INNER JOIN rcmdb.repdata r ON a.an = r.an
    WHERE a.regdate BETWEEN '2022-10-01' AND '2023-09-30') rep ON a.an = rep.an
    LEFT JOIN (SELECT
      rc.AN,
      rc.VN,
       rc.ID,
       rc.PID,
       rc.PtName,
       rc.AdmDate,
       rc.Compensated
       FROM an_stat a
       INNER JOIN rcmdb.repeclaim rc ON a.an = rc.an
       WHERE a.regdate BETWEEN '2022-10-01' AND '2023-09-30') sta ON a.an = sta.an
    LEFT JOIN pttype ON a.pttype = pttype.pttype
    WHERE a.regdate BETWEEN '2022-10-01' AND '2023-09-30'
    AND pttype.pttype = '${pttype}'
    `;
      const query = await dbHos.raw(sql);
      res.json({ status: 200, results: query[0] });
    } catch (error: any) {
      res.json({ status: 500, results: error.message });
    }
  }
);
dbudgetRoutes.get(
  "/visit-ipd-month/:ar_id/:date1/:date2",
  verifyToken,
  async (req: Request, res: Response) => {
    const { ar_id } = req.params;
    const { date1 } = req.params;
    const { date2 } = req.params;

    try {
      var sql = `SELECT
   pe.ar_ipd,
   pe.name as pttype_claim_name,
   p.hipdata_code,
   p.name as pttype_name,
   a.pttype,
   FORMAT(SUM(IF(MONTH(a.regdate) = 10,1,0) ), 0)  as 'M10',
   FORMAT(SUM(IF(MONTH(a.regdate) = 10,a.item_money,0) ), 2)  as 'money_10',
   FORMAT(SUM(IF(MONTH(a.regdate) = 10,r.Collected,0) ), 2) as 'col_10',
   FORMAT(SUM(IF(MONTH(a.regdate) = 10,c.Compensated,0) ), 2) as 'com_10',
   
   FORMAT(SUM(IF(MONTH(a.regdate) = 11,1,0) ), 0)  as 'M11',
   FORMAT(SUM(IF(MONTH(a.regdate) = 11,a.item_money,0) ), 2) as 'money_11',
   FORMAT(SUM(IF(MONTH(a.regdate) = 11,r.Collected,0) ), 2) as 'col_11',
   FORMAT(SUM(IF(MONTH(a.regdate) = 11,c.Compensated,0) ), 2) as 'com_11',
   
   FORMAT(SUM(IF(MONTH(a.regdate) = 12,1,0) ), 0)  as 'M12',
   FORMAT(SUM(IF(MONTH(a.regdate) = 12,a.item_money,0) ), 2) as 'money_12',
   FORMAT(SUM(IF(MONTH(a.regdate) = 12,r.Collected,0) ), 2) as 'col_12',
   FORMAT(SUM(IF(MONTH(a.regdate) = 12,c.Compensated,0) ), 2) as 'com_12',
   
   FORMAT(SUM(IF(MONTH(a.regdate) = 01,1,0) ), 0) as 'M01',
   FORMAT(SUM(IF(MONTH(a.regdate) = 01,a.item_money,0) ), 2) as 'money_01',
   FORMAT(SUM(IF(MONTH(a.regdate) = 01,r.Collected,0) ), 2) as 'col_01',
   FORMAT(SUM(IF(MONTH(a.regdate) = 01,c.Compensated,0) ), 2) as 'com_01',
   
   FORMAT(SUM(IF(MONTH(a.regdate) = 02,1,0) ), 0)  as 'M02',
   FORMAT(SUM(IF(MONTH(a.regdate) = 02,a.item_money,0) ), 2) as 'money_02',
   FORMAT(SUM(IF(MONTH(a.regdate) = 02,r.Collected,0) ), 2) as 'col_02',
   FORMAT(SUM(IF(MONTH(a.regdate) = 02,c.Compensated,0) ), 2) as 'com_02',
   
   FORMAT(SUM(IF(MONTH(a.regdate) = 03,1,0) ),0) as 'M03',
   FORMAT(SUM(IF(MONTH(a.regdate) = 03,a.item_money,0) ),2) as 'money_03',
   FORMAT(SUM(IF(MONTH(a.regdate) = 03,r.Collected,0) ),2) as 'col_03',
   FORMAT(SUM(IF(MONTH(a.regdate) = 03,c.Compensated,0) ),2) as 'com_03',
   
   FORMAT(SUM(IF(MONTH(a.regdate) = 04,1,0) ),0) as 'M04',
   FORMAT(SUM(IF(MONTH(a.regdate) = 04,a.item_money,0) ),2) as 'money_04',
   FORMAT(SUM(IF(MONTH(a.regdate) = 04,r.Collected,0) ),2) as 'col_04',
   FORMAT(SUM(IF(MONTH(a.regdate) = 04,c.Compensated,0) ),2) as 'com_04',
   
   FORMAT(SUM(IF(MONTH(a.regdate) = 05,1,0) ),0) as 'M05',
   FORMAT(SUM(IF(MONTH(a.regdate) = 05,a.item_money,0) ),2) as 'money_05',
   FORMAT(SUM(IF(MONTH(a.regdate) = 05,r.Collected,0) ),2) as 'col_05',
   FORMAT(SUM(IF(MONTH(a.regdate) = 05,c.Compensated,0) ),2) as 'com_05',
   
   FORMAT(SUM(IF(MONTH(a.regdate) = 06,1,0) ),0) as 'M06',
   FORMAT(SUM(IF(MONTH(a.regdate) = 06,a.item_money,0) ),2) as 'money_06',
   FORMAT(SUM(IF(MONTH(a.regdate) = 06,r.Collected,0) ),2) as 'col_06',
   FORMAT(SUM(IF(MONTH(a.regdate) = 06,c.Compensated,0) ),2) as 'com_06',
   
   FORMAT(SUM(IF(MONTH(a.regdate) = 07,1,0) ),0) as 'M07',
   FORMAT(SUM(IF(MONTH(a.regdate) = 07,a.item_money,0) ),2) as 'money_07',
   FORMAT(SUM(IF(MONTH(a.regdate) = 07,r.Collected,0) ),2) as 'col_07',
   FORMAT(SUM(IF(MONTH(a.regdate) = 07,c.Compensated,0) ),2) as 'com_07',
   
   FORMAT(SUM(IF(MONTH(a.regdate) = 08,1,0) ),0) as 'M08',
   FORMAT(SUM(IF(MONTH(a.regdate) = 08,a.item_money,0) ),2) as 'money_08',
   FORMAT(SUM(IF(MONTH(a.regdate) = 08,r.Collected,0) ),2) as 'col_08',
   FORMAT(SUM(IF(MONTH(a.regdate) = 08,c.Compensated,0) ),2) as 'com_08',
   
   FORMAT(SUM(IF(MONTH(a.regdate) = 09,1,0) ),0) as 'M09',
   FORMAT(SUM(IF(MONTH(a.regdate) = 09,a.item_money,0) ),2) as 'money_09',
   FORMAT(SUM(IF(MONTH(a.regdate) = 09,r.Collected,0) ),2) as 'col_09',
   FORMAT(SUM(IF(MONTH(a.regdate) = 09,c.Compensated,0) ),2) as 'com_09'
   FROM an_stat a
   LEFT JOIN pttype p ON a.pttype = p.pttype
   LEFT JOIN rcmdb.repdata r ON a.an = r.an
   LEFT JOIN rcmdb.repeclaim c ON r.ID = c.ID
   LEFT JOIN pttype_eclaim pe ON p.pttype_eclaim_id = pe.code
   WHERE pe.ar_ipd = '${ar_id}'
   AND a.regdate BETWEEN '${date1}' AND '${date2}'
   GROUP BY p.pttype
   `;
      const query = await dbHos.raw(sql);
      res.json({ status: 200, results: query[0] });
    } catch (error: any) {
      res.json({ status: 500, results: error.message });
    }
  }
);
dbudgetRoutes.get(
  "/visit-ipd/:pttype/:date1/:date2",
  verifyToken,
  async (req: Request, res: Response) => {
    const { pttype } = req.params;
    const { date1 } = req.params;
    const { date2 } = req.params;

    try {
      var sql = `SELECT
    a.an,
    a.hn,
    CONCAT(p.fname,' ',p.lname) as fullname,
    p.cid,
    pttype.name as pttype_name,
    pttype.hipdata_code,
    pe.ar_ipd,
    pe.name AS pttype_claim_name,
    a.regdate,
    FORMAT(a.item_money,2) as item_money,
    FORMAT(r.Collected,2) as Collected,
    FORMAT(c.Compensated,2) as Compensated,
    FORMAT(c.Compensated*100/r.Collected,2) as persen
   FROM an_stat a
    LEFT JOIN patient p ON a.hn = p.hn
   LEFT JOIN rcmdb.repdata r ON a.an = r.an
   LEFT JOIN rcmdb.repeclaim c ON a.an = c.an
    LEFT JOIN pttype ON a.pttype = pttype.pttype
    LEFT JOIN pttype_eclaim pe ON pttype.pttype_eclaim_id = pe.code
   WHERE a.pttype = '${pttype}'
   AND  a.regdate BETWEEN '${date1}'  AND '${date2}'
    `;
      const query = await dbHos.raw(sql);
      res.json({ status: 200, results: query[0] });
    } catch (error: any) {
      res.json({ status: 500, results: error.message });
    }
  }
);
dbudgetRoutes.get(
  "/ipd-hos-rep/:pttype/:date1/:date2",
  verifyToken,
  async (req, res: Response) => {
    const { pttype } = req.params;
    const { date1 } = req.params;
    const { date2 } = req.params;

    try {
      var sql = `SELECT
    a.an,
    a.hn,
    CONCAT(p.fname,' ',p.lname) as fullname,
    a.regdate,
    rep.AdmDate,
    a.pttype,
    sta.Rep,
    FORMAT(a.item_money,2) as item_money,
    FORMAT(rep.Collected,2) as Collected,
    FORMAT(sta.Compensated,2) as Compensated,
    pttype.name as pttype
    FROM an_stat a
    INNER JOIN patient p ON a.hn = p.hn
    LEFT JOIN (SELECT
    r.AN,
    r.VN,
    r.ID,
    r.PID,
    r.PtName,
    r.AdmDate,
    r.Collected
    FROM an_stat a
    INNER JOIN rcmdb.repdata r ON a.an = r.an
    WHERE a.regdate BETWEEN '2022-10-01' AND '2023-09-30') rep ON a.an = rep.an
    LEFT JOIN (SELECT
      rc.AN,
      rc.VN,
       rc.ID,
       rc.PID,
       rc.PtName,
       rc.AdmDate,
       rc.Compensated,
       rc.Rep
       FROM an_stat a
       INNER JOIN rcmdb.repeclaim rc ON a.an = rc.an
       WHERE a.regdate BETWEEN '2022-10-01' AND '2023-09-30') sta ON a.an = sta.an
    LEFT JOIN pttype ON a.pttype = pttype.pttype
    WHERE pttype.pttype = '${pttype}'
    AND a.regdate BETWEEN '${date1}' AND '${date2}'
    `;
      const query = await dbHos.raw(sql);
      res.json({ status: 200, results: query[0] });
    } catch (error: any) {
      res.json({ status: 500, results: error.message });
    }
  }
);
dbudgetRoutes.get(
  "/ipd-group-rep/:pttype_eclaim_id/:date1/:date2",
  verifyToken,
  async (req, res: Response) => {
    const { pttype_eclaim_id } = req.params;
    const { date1 } = req.params;
    const { date2 } = req.params;

    try {
      var sql = `SELECT
    a.an,
    a.hn,
    CONCAT(p.fname,' ',p.lname) as fullname,
    a.regdate,
    rep.AdmDate,
    a.pttype,
      pe.code,
    pe.name as pe_name,
    sta.Rep,
    FORMAT(a.item_money,2) as item_money,
    FORMAT(rep.Collected,2) as Collected,
    FORMAT(sta.Compensated,2) as Compensated
    FROM an_stat a
    INNER JOIN patient p ON a.hn = p.hn
    LEFT JOIN (SELECT
    r.AN,
    r.VN,
    r.ID,
    r.PID,
    r.PtName,
    r.AdmDate,
    r.Collected
    FROM an_stat a
    INNER JOIN rcmdb.repdata r ON a.an = r.an
    WHERE a.regdate BETWEEN '2022-10-01' AND '2023-09-30') rep ON a.an = rep.an
    LEFT JOIN (SELECT
      rc.AN,
      rc.VN,
       rc.ID,
       rc.PID,
       rc.PtName,
       rc.AdmDate,
       rc.Compensated,
       rc.Rep
       FROM an_stat a
       INNER JOIN rcmdb.repeclaim rc ON a.an = rc.an
       WHERE a.regdate BETWEEN '2022-10-01' AND '2023-09-30') sta ON a.an = sta.an
  LEFT JOIN pttype ON a.pttype = pttype.pttype
  LEFT JOIN pttype_eclaim pe ON pttype.pttype_eclaim_id = pe.code
    WHERE pe.code = '${pttype_eclaim_id}'
    AND a.regdate BETWEEN '${date1}' AND '${date2}'
    `;
      const query = await dbHos.raw(sql);
      res.json({ status: 200, results: query[0] });
    } catch (error: any) {
      res.json({ status: 500, results: error.message });
    }
  }
);
dbudgetRoutes.get(
  "/opd-hos-rep/:pttype",
  verifyToken,
  async (req: Request, res: Response) => {
    const { pttype } = req.params;

    try {
      var sql = `SELECT
    v.vn,
    v.hn,
    CONCAT(p.fname,' ',p.lname) as fullname,
    v.vstdate,
    rep.AdmDate,
    v.pttype,
    FORMAT(v.item_money,2) as item_money,
    FORMAT(rep.Collected,2) as Collected,
    pttype.name as pttype
    FROM vn_stat v
    INNER JOIN patient p ON v.hn = p.hn
    LEFT JOIN (SELECT
    r.VN,
    r.ID,
    r.PID,
    r.PtName,
    r.AdmDate,
    r.Collected
    FROM vn_stat v
    INNER JOIN rcmdb.repdata r ON v.vn = r.vn
    WHERE v.vstdate BETWEEN '2022-10-01' AND '2023-09-30') rep ON v.vn = rep.vn
    LEFT JOIN pttype ON v.pttype = pttype.pttype
    WHERE v.vstdate BETWEEN '2022-10-01' AND '2023-09-30'
    AND pttype.pttype = '${pttype}'
    `;
      const query = await dbHos.raw(sql);
      res.json({ status: 200, results: query[0] });
    } catch (error: any) {
      res.json({ status: 500, results: error.message });
    }
  }
);
dbudgetRoutes.get(
  "/opd-hos-rep/:pttype/:date1/:date2",
  verifyToken,
  async (req: Request, res: Response) => {
    const { pttype } = req.params;
    const { date1 } = req.params;
    const { date2 } = req.params;
    try {
      var sql = `SELECT
  v.vn,
  v.hn,
  CONCAT(p.fname,' ',p.lname) as fullname,
  v.vstdate,
  rep.AdmDate,
  v.pttype,
  FORMAT(v.item_money,2) as item_money,
  FORMAT(rep.Collected,2) as Collected,
  pttype.name as pttype
  FROM vn_stat v
  INNER JOIN patient p ON v.hn = p.hn
  LEFT JOIN (SELECT
  r.VN,
  r.ID,
  r.PID,
  r.PtName,
  r.AdmDate,
  r.Collected
  FROM vn_stat v
  INNER JOIN rcmdb.repdata r ON v.vn = r.vn
  WHERE v.vstdate BETWEEN '2022-10-01' AND '2023-09-30') rep ON v.vn = rep.vn
  LEFT JOIN pttype ON v.pttype = pttype.pttype
  WHERE pttype.pttype = '${pttype}'
  AND v.vstdate BETWEEN '${date1}' AND '${date2}'
  `;
      const query = await dbHos.raw(sql);
      res.json({ status: 200, results: query[0] });
    } catch (error: any) {
      res.json({ status: 500, results: error.message });
    }
  }
);
dbudgetRoutes.get(
  "/seamless-detail/:fund_code/:date1/:date2",
  verifyToken,
  async (req: Request, res: Response) => {
    const { fund_code } = req.params;
    const { date1 } = req.params;
    const { date2 } = req.params;

    try {
      var sql = `SELECT
    s.ID,
    s.Fund,
    S.Rep,
    s.VN,
    s.HN,
    s.AN,
    s.PID,
    s.Ptname,
    s.AdmDate,
    s.MainInscl,
    s.HCode,
    s.Type,
    s.SerialNo,
    s.SendDate,
    s.PayNo,
    s.PayDate,
    s.Collected,
    s.Compensated,
    s.NoCompensated,
    s.PayMore,
    s.Recall,
    s.Status,
    s.Note
    FROM seamless s
    WHERE s.AdmDate BETWEEN '${date1}'  AND '${date2}'
    AND LEFT(s.Rep,4) = '${fund_code}'
    `;
      const query = await dbRcm.raw(sql);
      res.json({ status: 200, results: query[0] });
    } catch (error: any) {
      res.json({ status: 500, results: error.message });
    }
  }
);
//  ipd รายเดือน
dbudgetRoutes.get(
  "/reports-ipd-month/:date1/:date2/:ar_id",
  verifyToken,
  async (req: Request, res: Response) => {
    const { ar_id } = req.params;
    const { date1 } = req.params;
    const { date2 } = req.params;

    try {
      var sql = `SELECT
   pe.ar_ipd,
   pe.name as pttype_claim_name,
   p.hipdata_code,
   p.name as pttype_name,
   a.pttype,
   FORMAT(SUM(IF(MONTH(a.regdate) = 10,1,0) ), 0)  as 'M10',
   FORMAT(SUM(IF(MONTH(a.regdate) = 10,a.item_money,0) ), 2)  as 'money_10',
   FORMAT(SUM(IF(MONTH(a.regdate) = 10,r.Collected,0) ), 2) as 'col_10',
   FORMAT(SUM(IF(MONTH(a.regdate) = 10,c.Compensated,0) ), 2) as 'com_10',
   
   FORMAT(SUM(IF(MONTH(a.regdate) = 11,1,0) ), 0)  as 'M11',
   FORMAT(SUM(IF(MONTH(a.regdate) = 11,a.item_money,0) ), 2) as 'money_11',
   FORMAT(SUM(IF(MONTH(a.regdate) = 11,r.Collected,0) ), 2) as 'col_11',
   FORMAT(SUM(IF(MONTH(a.regdate) = 11,c.Compensated,0) ), 2) as 'com_11',
   
   FORMAT(SUM(IF(MONTH(a.regdate) = 12,1,0) ), 0)  as 'M12',
   FORMAT(SUM(IF(MONTH(a.regdate) = 12,a.item_money,0) ), 2) as 'money_12',
   FORMAT(SUM(IF(MONTH(a.regdate) = 12,r.Collected,0) ), 2) as 'col_12',
   FORMAT(SUM(IF(MONTH(a.regdate) = 12,c.Compensated,0) ), 2) as 'com_12',
   
   FORMAT(SUM(IF(MONTH(a.regdate) = 01,1,0) ), 0) as 'M01',
   FORMAT(SUM(IF(MONTH(a.regdate) = 01,a.item_money,0) ), 2) as 'money_01',
   FORMAT(SUM(IF(MONTH(a.regdate) = 01,r.Collected,0) ), 2) as 'col_01',
   FORMAT(SUM(IF(MONTH(a.regdate) = 01,c.Compensated,0) ), 2) as 'com_01',
   
   FORMAT(SUM(IF(MONTH(a.regdate) = 02,1,0) ), 0)  as 'M02',
   FORMAT(SUM(IF(MONTH(a.regdate) = 02,a.item_money,0) ), 2) as 'money_02',
   FORMAT(SUM(IF(MONTH(a.regdate) = 02,r.Collected,0) ), 2) as 'col_02',
   FORMAT(SUM(IF(MONTH(a.regdate) = 02,c.Compensated,0) ), 2) as 'com_02',
   
   FORMAT(SUM(IF(MONTH(a.regdate) = 03,1,0) ),0) as 'M03',
   FORMAT(SUM(IF(MONTH(a.regdate) = 03,a.item_money,0) ),2) as 'money_03',
   FORMAT(SUM(IF(MONTH(a.regdate) = 03,r.Collected,0) ),2) as 'col_03',
   FORMAT(SUM(IF(MONTH(a.regdate) = 03,c.Compensated,0) ),2) as 'com_03',
   
   FORMAT(SUM(IF(MONTH(a.regdate) = 04,1,0) ),0) as 'M04',
   FORMAT(SUM(IF(MONTH(a.regdate) = 04,a.item_money,0) ),2) as 'money_04',
   FORMAT(SUM(IF(MONTH(a.regdate) = 04,r.Collected,0) ),2) as 'col_04',
   FORMAT(SUM(IF(MONTH(a.regdate) = 04,c.Compensated,0) ),2) as 'com_04',
   
   FORMAT(SUM(IF(MONTH(a.regdate) = 05,1,0) ),0) as 'M05',
   FORMAT(SUM(IF(MONTH(a.regdate) = 05,a.item_money,0) ),2) as 'money_05',
   FORMAT(SUM(IF(MONTH(a.regdate) = 05,r.Collected,0) ),2) as 'col_05',
   FORMAT(SUM(IF(MONTH(a.regdate) = 05,c.Compensated,0) ),2) as 'com_05',
   
   FORMAT(SUM(IF(MONTH(a.regdate) = 06,1,0) ),0) as 'M06',
   FORMAT(SUM(IF(MONTH(a.regdate) = 06,a.item_money,0) ),2) as 'money_06',
   FORMAT(SUM(IF(MONTH(a.regdate) = 06,r.Collected,0) ),2) as 'col_06',
   FORMAT(SUM(IF(MONTH(a.regdate) = 06,c.Compensated,0) ),2) as 'com_06',
   
   FORMAT(SUM(IF(MONTH(a.regdate) = 07,1,0) ),0) as 'M07',
   FORMAT(SUM(IF(MONTH(a.regdate) = 07,a.item_money,0) ),2) as 'money_07',
   FORMAT(SUM(IF(MONTH(a.regdate) = 07,r.Collected,0) ),2) as 'col_07',
   FORMAT(SUM(IF(MONTH(a.regdate) = 07,c.Compensated,0) ),2) as 'com_07',
   
   FORMAT(SUM(IF(MONTH(a.regdate) = 08,1,0) ),0) as 'M08',
   FORMAT(SUM(IF(MONTH(a.regdate) = 08,a.item_money,0) ),2) as 'money_08',
   FORMAT(SUM(IF(MONTH(a.regdate) = 08,r.Collected,0) ),2) as 'col_08',
   FORMAT(SUM(IF(MONTH(a.regdate) = 08,c.Compensated,0) ),2) as 'com_08',
   
   FORMAT(SUM(IF(MONTH(a.regdate) = 09,1,0) ),0) as 'M09',
   FORMAT(SUM(IF(MONTH(a.regdate) = 09,a.item_money,0) ),2) as 'money_09',
   FORMAT(SUM(IF(MONTH(a.regdate) = 09,r.Collected,0) ),2) as 'col_09',
   FORMAT(SUM(IF(MONTH(a.regdate) = 09,c.Compensated,0) ),2) as 'com_09'
   FROM an_stat a
   LEFT JOIN pttype p ON a.pttype = p.pttype
   LEFT JOIN rcmdb.repdata r ON a.an = r.an
   LEFT JOIN rcmdb.repeclaim c ON r.ID = c.ID
   LEFT JOIN pttype_eclaim pe ON p.pttype_eclaim_id = pe.code
   WHERE a.regdate BETWEEN '${date1}'  AND '${date2}'
   AND pe.ar_ipd = '${ar_id}'
   GROUP BY p.pttype
   `;
      const query = await dbHos.raw(sql);
      res.json({ status: 200, results: query[0] });
    } catch (error: any) {
      res.json({ status: 500, results: error.message });
    }
  }
);

export default dbudgetRoutes;
