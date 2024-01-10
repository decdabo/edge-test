'use client'
import { StreamDetailComponent } from '@/components/commons/StreamDetailComponent'
import { useAuthContext } from '@/context/auth-context'
import { getStreamById } from '@/services/services'
import { PAGES } from '@/utils/pages'
import { StreamStatus } from '@/utils/types'
import { Col, Descriptions, Divider, Row, Tag } from 'antd'
import Title from 'antd/es/typography/Title'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'



const Page = () => {
  const router = useRouter()
  const { state }: any = useAuthContext();
  const stream_id = useSearchParams().get('id')
  const [ streamData, setStreamData ] = useState<StreamStatus>()

  useEffect(() => {
    if (stream_id) {
      getStreamById(
        state.token,
        stream_id
      ) 
      .then(response => setStreamData(response))
    } else {
      router.push(PAGES.HOME)
    }
  }, [stream_id, state.token])

  

  return (
    <div className='bg-grey' style={{ height: '100%', padding: '20px' }}>
      {
        streamData && (
          <StreamDetailComponent streamData={streamData} isStream={true} />
        )
      }
    </div>
  )
}

export default Page;
