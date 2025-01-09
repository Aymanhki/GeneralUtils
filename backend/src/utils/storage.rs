// use std::path::Path;
// use std::fs;
// use aws_sdk_s3::Client;
// use aws_config::BehaviorVersion;
// use aws_sdk_s3::primitives::ByteStream;
// use aws_sdk_s3::primitives::SdkBody;
//
// pub async fn save_asset(key: &str, data: &[u8]) -> Result<(), Box<dyn std::error::Error>> {
//     // First, try S3 upload
//     match upload_to_s3(key, data).await {
//         Ok(_) => {
//             println!("Successfully uploaded to S3");
//             return Ok(());
//         },
//         Err(s3_err) => {
//             println!("S3 upload failed: {}", s3_err);
//         }
//     }
//
//     // If S3 fails, save locally
//     save_locally(key, data)
// }
//
// async fn upload_to_s3(key: &str, data: &[u8]) -> Result<(), Box<dyn std::error::Error>> {
//     let config = aws_config::defaults(BehaviorVersion::latest())
//         .load()
//         .await;
//
//     let client = Client::new(&config);
//
//     client
//         .put_object()
//         .bucket("your-bucket-name")
//         .key(key)
//         .body(ByteStream::from(SdkBody::from(data)))
//         .send()
//         .await?;
//
//     Ok(())
// }
//
// fn save_locally(key: &str, data: &[u8]) -> Result<(), Box<dyn std::error::Error>> {
//     // Ensure assets directory exists
//     let assets_dir = Path::new("./assets");
//     fs::create_dir_all(assets_dir)?;
//
//     // Save file
//     let file_path = assets_dir.join(key);
//     fs::write(file_path, data)?;
//
//     println!("Asset saved locally");
//     Ok(())
// }