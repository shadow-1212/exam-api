import { PrismaClient } from '@prisma/client'
import express from 'express'
import { stringify } from 'querystring'


const prisma = new PrismaClient()
const app = express()

app.use(express.json())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// ... your REST API routes will go here
app.use(express.static('public'));

// ?DEVICE
// GET ALL
app.get('/device', async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
      const devices = await prisma.device.findMany({
          include: { user :true,state:true }
      })
      return res.json({
        success:true,
        data:devices
      })
  }catch (e) {
    return res.json({
        success:false,
        message:e
    })
  }
})

// POST
app.post('/device', async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const { dvc_id, dvc_name, dvc_description, dvc_created_at, dvc_updated_at,device_actions,userId,stateId} = req.body
  const device = await prisma.device.create({
    data: {
        dvc_id,dvc_name,dvc_description,dvc_created_at,dvc_updated_at,
        device_actions: {
            ...device_actions
        },
        userId:userId,
        stateId:stateId
    },
  })
  return res.json({
      success:true,
      data:device
  })
})
// PUT
app.put('/device/:id', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const { id } = req.params
    const { dvc_id, dvc_name, dvc_description, dvc_created_at, dvc_updated_at,device_actions,userId,stateId} = req.body
    const device = await prisma.device.update({
        where: { dvc_id: Number(id) },
        data: {
            dvc_id,dvc_name,dvc_description,dvc_created_at,dvc_updated_at,
            device_actions: {
                ...device_actions
            },
            userId:userId,
            stateId:stateId
        },
    })
    return res.json({
        success:true,
        data:device
    })
})
// DELETE
app.delete('/device/:id', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const { id } = req.params
    const device = await prisma.device.delete({
        where: { dvc_id: Number(id) },
    })
    return res.json({
        success:true,
        data:device
    })
})

// ?STATE
// GET ALL
app.get('/state', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    try {
        const states = await prisma.state.findMany({
            include: { devices :true}
        })
        return res.json({
            success:true,
            data:states
        })
    }catch (e) {
        return res.json({
            success:false,
            message:e
        })
    }
})
//GET ONE
app.get('/state/:id', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const { id } = req.params
    const state = await prisma.state.findUnique({
        where: { state_id: Number(id) },
        include: { devices :true }
    })
    return res.json({
        success:true,
        data:state
    })
})
// POST
app.post('/state', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const { state_id, state_name} = req.body
    const state = await prisma.state.create({
        data: {
            state_id, state_name,
        },
    })
    return res.json({
        success:true,
        data:state
    })
})
// PUT
app.put('/state/:id', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const { id } = req.params
    const { state_id, state_name} = req.body
    const state = await prisma.state.update({
        where: { state_id: Number(id) },
        data: {
            state_id,state_name
        },
    })
    return res.json({
        success:true,
        data:state
    })
})
// DELETE
app.delete('/state/:id', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const { id } = req.params
    const state = await prisma.state.delete({
        where: { state_id: Number(id) },
    })
    return res.json({
        success:true,
        data:state
    })
})

// ?DEVICE_ACTIONS
// GET ALL
app.get('/device_actions', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    try {
        const deviceActions = await prisma.deviceActions.findMany({
            include: { device :true}
        })
        return res.json({
            success:true,
            data:deviceActions
        })
    }catch (e) {
        return res.json({
            success:false,
            message:e
        })
    }
})
//GET ONE
app.get('/device_actions/:id', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const { id } = req.params
    const deviceAction = await prisma.deviceActions.findUnique({
        where: { dact_id: Number(id) },
        include: { device :true }
    })
    return res.json({
        success:true,
        data:deviceAction
    })
})
// POST
app.post('/device_actions', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const { dact_id,dact_name,dact_description,dact_date,dact_created_at,dact_updated_at,deviceId} = req.body
    const state = await prisma.deviceActions.create({
        data: {
            dact_id,dact_name,dact_description,dact_date,dact_created_at,dact_updated_at,deviceId
        },
    })
    return res.json({
        success:true,
        data:state
    })
})
// PUT
app.put('/deviceActions/:id', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const { id } = req.params
    const { dact_id,dact_name,dact_description,dact_date,dact_created_at,dact_updated_at,deviceId} = req.body
    const state = await prisma.deviceActions.update({
        where: { dact_id: Number(id) },
        data: {
            dact_id,dact_name,dact_description,dact_date,dact_created_at,dact_updated_at,deviceId
        },
    })
    return res.json({
        success:true,
        data:state
    })
})
// DELETE
app.delete('/deviceActions/:id', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const { id } = req.params
    const state = await prisma.deviceActions.delete({
        where: { dact_id: Number(id) },
    })
    return res.json({
        success:true,
        data:state
    })
})


// ?USER
app.post('/user', async (req, res) => {
  const { user_name, user_password, user_email,user_lastname,devices} = req.body
  const user = await prisma.user.create({
    data: {
        user_name,user_email,user_lastname,user_password
    },
  })
  return res.json(user)
})

app.post(`/login`, async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
   const { email, password } = req.body;
   const user = await prisma.user.findFirst({
    where: {
      user_email: String(email),
      user_password: String(password)
    },
   })
   return res.json(user)
 })

app.listen(3200, () =>
  console.log('REST API server ready at: http://localhost:3200'),
)
