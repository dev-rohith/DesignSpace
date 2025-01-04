import {format} from 'date-fns'

const formatDate = (date,format = 'YYYY-MM-DD') => {
    return date.format(format)
}


