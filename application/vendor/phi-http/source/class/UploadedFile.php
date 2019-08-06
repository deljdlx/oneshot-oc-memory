<?php


namespace Phi\HTTP;


use Phi\Core\Exception;

class UploadedFile implements \JsonSerializable
{

    protected $fileData;
    protected $destinationPath;

    public function __construct($fileData)
    {
        $this->fileData = $fileData;
    }

    public function getData()
    {
        return $this->fileData;
    }

    public function getTemporaryName()
    {
        return $this->fileData['tmp_name'];
    }

    public function getName()
    {
        return $this->fileData['name'];
    }

    public function saveIntoPath($path, $newName = null)
    {

        if(!is_dir($path)) {
            throw new Exception('Path '.$path.'does not exist');
        }

        if(!is_writable($path)) {
            throw new Exception('Path '.$path.' is not writable');
        }

        if($newName === null) {
            $destination = $path.'/'.$this->getName();
        }
        else {
            $destination = $path.'/'.$newName;
        }

        $this->destinationPath = $destination;

        $success = move_uploaded_file(
           $this->getTemporaryName(),
           $destination
        );

        if(!$success) {
            throw new Exception('Move uploaded file to "'.$destination.'"" failed');
        }

        return $this->destinationPath;
    }

    public function jsonSerialize()
    {
        $data = $this->fileData;
        $data['destination'] = $this->destinationPath;
        return $data;
    }


}
