import axios from "axios"

export interface ProfileBasicRes {
  status: number
  video: {
    mode: string
    acquisition: {
      resolution: string
      frameRate: number
    }
    encoding: {
      resolution: string
      rate: {
        min: number
        max: number
        default: number
      }
      frameRate: number
      profile: string
    }
  }
  audio: {
    mode: string
    acquisition: {
      channels: number
    }
    encoding: {
      channels: number
      rate: number
      profile: string
    }
  }
}

export async function queryProfileBasic() {
  return {
    data: {
      status: 2,
      video: {
        mode: "自定义",
        acquisition: {
          resolution: "720*1280",
          frameRate: 15
        },
        encoding: {
          resolution: "720*1280",
          rate: {
            min: 300,
            max: 800,
            default: 1500
          },
          frameRate: 15,
          profile: "high"
        }
      },
      audio: {
        mode: "自定义",
        acquisition: {
          channels: 8
        },
        encoding: {
          channels: 8,
          rate: 128,
          profile: "ACC-LC"
        }
      }
    }
  }
}

export type operationLogRes = Array<{
  key: string
  contentNumber: string
  updateContent: string
  status: number
  updateTime: string
}>

export async function queryOperationLog() {
  return {
    data: [
      {
        key: "1",
        contentNumber: "视频类001003",
        updateContent: "视频参数变更",
        status: 0,
        updateTime: "2021-02-28 10:30:50"
      },
      {
        key: "2",
        contentNumber: "视频类058212",
        updateContent: "视频参数变更；音频参数变更",
        status: 1,
        updateTime: "2020-05-13 08:00:00"
      }
    ]
  }
}
