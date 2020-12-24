export class OPENAPI_ERR {
    static readonly NORMAL_SERVICE = 0;     //정상
    static readonly APPLICATION_ERROR = 1;      //어플리케이션 에러
    static readonly DB_ERROR = 2;       //데이터베이스 에러
    static readonly NODATA_ERROR = 3;       //데이터 없음 에러
    static readonly HTTP_ERROR = 4;     //HTTP 에러
    static readonly SERVICETIMEOUT_ERROR = 5;       //서비스 연결 실패 에러
    static readonly INVALID_REQUEST_PARAMETER_ERROR = 10;       //잘못된 요청 파라미터 에러
    static readonly NO_MANDATORY_REQUEST_PARAMETERS_ERROR = 11;     //필수요펑 파라미터 에러
    static readonly NO_OPENAPI_SERVICE_ERROR = 12;      //해당 오픈 API 서비스가 없거나 폐기됨
    static readonly SERVICE_ACCESS_DENIED_ERROR = 20;       //서비스 접근거부
    static readonly TEMPORARILY_DISABLE_THE_SERVICEKEY_ERROR = 21;      //일시적으로 상뇽할 수 없는 서비스 키
    static readonly LIMITED_NUMBER_OF_SERVICE_REQUESTS_EXCEEDS_ERROR = 22;      //서비스 요청제한횟수 초과에러
    static readonly SERVICE_KEY_IS_NOT_REGISTERED_ERROR = 30;       //등록되지 않은 서비스 키
    static readonly DEADLINE_HAS_EXPIRED_ERROR = 31;        //기한만료된 서비스 키
    static readonly UNREGISTERED_IP_ERROR = 32;     //등록되지 않은 IP
    static readonly UNSIGNED_CALL_ERROR = 33;       //서명되지 않은 호출
    static readonly UNKNOWN_ERROR = 99;     //기타 에러
}

export class OPENAPI_ERR_MSG {
    you = new Map()
    .set(OPENAPI_ERR.NORMAL_SERVICE, '정상')
    .set(OPENAPI_ERR.APPLICATION_ERROR, '어플리케이션 에러')
    .set(OPENAPI_ERR.DB_ERROR, '데이터베이스 에러')
    .set(OPENAPI_ERR.NODATA_ERROR, '데이터 없음 에러')
    .set(OPENAPI_ERR.HTTP_ERROR, 'HTTP 에러')
    .set(OPENAPI_ERR.SERVICETIMEOUT_ERROR, '서비스 연결 실패 에러')
    .set(OPENAPI_ERR.INVALID_REQUEST_PARAMETER_ERROR, '잘못된 요청 파라미터 에러')
    .set(OPENAPI_ERR.NO_MANDATORY_REQUEST_PARAMETERS_ERROR, '필수요펑 파라미터 에러')
    .set(OPENAPI_ERR.NO_OPENAPI_SERVICE_ERROR, '해당 오픈 API 서비스가 없거나 폐기됨')
    .set(OPENAPI_ERR.SERVICE_ACCESS_DENIED_ERROR, '서비스 접근거부')
    .set(OPENAPI_ERR.TEMPORARILY_DISABLE_THE_SERVICEKEY_ERROR, '일시적으로 상뇽할 수 없는 서비스 키')
    .set(OPENAPI_ERR.SERVICE_KEY_IS_NOT_REGISTERED_ERROR, '서비스 요청제한횟수 초과에러')
    .set(OPENAPI_ERR.SERVICE_KEY_IS_NOT_REGISTERED_ERROR, '등록되지 않은 서비스 키')
    .set(OPENAPI_ERR.DEADLINE_HAS_EXPIRED_ERROR, '기한만료된 서비스 키')
    .set(OPENAPI_ERR.UNREGISTERED_IP_ERROR, '등록되지 않은 IP')
    .set(OPENAPI_ERR.UNSIGNED_CALL_ERROR, '서명되지 않은 호출')
    .set(OPENAPI_ERR.UNKNOWN_ERROR, '기타 에러')
}
